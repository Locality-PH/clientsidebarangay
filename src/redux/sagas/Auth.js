import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import {
  AUTH_TOKEN,
  ACCESS_TOKEN,
  AUTH_ORGANIZATION,
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  SIGNIN_WITH_GOOGLE,
  SIGNIN_WITH_FACEBOOK,
  AUTH_ORGANIZATION_LIST,
  SESSION_TOKEN,
  PROFILE_URL,
} from "../constants/Auth";
import {
  showAuthMessage,
  authenticated,
  signOutSuccess,
  signUpSuccess,
  signInWithGoogleAuthenticated,
  signInWithFacebookAuthenticated,
} from "../actions/Auth";
import axios from "axios";
import FirebaseService from "services/FirebaseService";
import { auth } from "auth/FirebaseAuth";
import publicIp from "react-public-ip";
import platform from "platform";
import jwt_decode from "jwt-decode";
import sign from "jwt-encode";

const family = platform.os.family;
const browser = platform.name;

async function loginOrganization(token) {
  const ipv4 = (await publicIp.v4()) || "";
  const date = new Date().getTime() / 1000;
  const unix = Math.round(date);

  const data = {
    ipv4: ipv4,
    auth_id: token,
    platform: family,
    email: auth.currentUser?.email,
    browser: browser,
    iat: unix,
    exp: unix + 60,
  };

  const jwt = sign(data, process.env.REACT_APP_ACCESS_TOKEN_SECRET);
  const header = {
    headers: {
      authorization: `Bearer ${jwt}`,
      "Strict-Transport-Security": "max-age=65540 ; includeSubDomains",
      "X-XSS-Protection": "1; mode=block",
      "Content-Security-Policy":
        " default-src 'self' http: https: data: blob: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self';",
    },
  };

  const login = {
    auth_id: token,
    email: auth.currentUser?.email,
    profile_url: auth.currentUser?.photoURL,
    user: auth.currentUser?.displayName,
  };

  axios
    .post("/api/auth/login/" + token, login, header)
    .then((res) => {
      localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
      localStorage.setItem(SESSION_TOKEN, res.data.accessToken);
      let tmp = generateToken();
      localStorage.setItem(ACCESS_TOKEN, tmp[0]);
      let organzationArray = [];
      let memberArray = [];
      let response = jwt_decode(res.data.accessToken);
      localStorage.setItem(
        PROFILE_URL,
        JSON.stringify({
          profile_data: res.data?.profileUrl,
          profile_color: response.profileLogo,
        })
      );

      if (response.organizations[0] && response.members[0]) {
        if (response.organizations[0].length > 0) {
          localStorage.setItem(AUTH_ORGANIZATION, organzationArray);
          response.members.map((t) => {
            memberArray.push({
              organization_role: t[0].organization_member_id,
              organization: t[0].organization_id,
            });
          });
          console.log(memberArray);
          localStorage.setItem(
            AUTH_ORGANIZATION_LIST,
            JSON.stringify(memberArray)
          );
        }
      } else {
        localStorage.setItem(AUTH_ORGANIZATION_LIST, null);
        localStorage.setItem(AUTH_ORGANIZATION, null);
        // setOrganizationMemberList(null);
        // setOrganization(null);
        //  return history.push(AUTH_PREFIX_PATH);
      }
    })
    .catch(async (error) => {
      signOut();
      console.log(error);
    });
}
function generateToken() {
  let response = jwt_decode(localStorage.getItem(ACCESS_TOKEN));
  let auth_organization = localStorage.getItem(AUTH_ORGANIZATION);

  const date = new Date().getTime() / 1000;
  const unix = Math.round(date);
  const data = {
    auth_id: response.auth_id,
    auth_organization: auth_organization,
    iat: unix,
    exp: unix + 100000,
  };
  const jwt = sign(data, process.env.REACT_APP_ACCESS_TOKEN_SECRET);
  const header = {
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Strict-Transport-Security": "max-age=65540 ; includeSubDomains",
      "X-XSS-Protection": "1; mode=block",
      "Content-Security-Policy":
        " default-src 'self' http: https: data: blob: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self';",
    },
  };
  return [jwt, header];
}

export function* signInWithFBEmail() {
  yield takeEvery(SIGNIN, function* ({ payload }) {
    const { email, password } = payload;
    try {
      const user = yield call(
        FirebaseService.signInEmailRequest,
        email,
        password
      );
      setTimeout(() => {});
      if (user.message) {
        yield put(showAuthMessage(user.message));
      } else {
        console.log(auth.currentUser);
        loginOrganization(user.user.uid);
        //  axios.post("/api/auth/login/"+user.user.uid,)
        localStorage.setItem(AUTH_TOKEN, user.user.uid);
        yield put(authenticated(user.user.uid));
      }
    } catch (err) {
      yield put(showAuthMessage(err));
    }
  });
}

export function* signOut() {
  yield takeEvery(SIGNOUT, function* () {
    try {
      const signOutUser = yield call(FirebaseService.signOutRequest);
      if (signOutUser === undefined) {
        localStorage.removeItem(AUTH_TOKEN);
        localStorage.removeItem(AUTH_ORGANIZATION);
        localStorage.removeItem(AUTH_ORGANIZATION_LIST);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(SESSION_TOKEN);
        localStorage.removeItem(PROFILE_URL);

        yield put(signOutSuccess(signOutUser));
      } else {
        yield put(showAuthMessage(signOutUser.message));
      }
    } catch (err) {
      yield put(showAuthMessage(err));
    }
  });
}

export function* signUpWithFBEmail() {
  yield takeEvery(SIGNUP, function* ({ payload }) {
    const { email, password } = payload;
    try {
      const user = yield call(
        FirebaseService.signUpEmailRequest,
        email,
        password
      );
      if (user.message) {
        yield put(showAuthMessage(user.message));
      } else {
        localStorage.setItem(AUTH_TOKEN, user.user.uid);

        yield put(signUpSuccess(user.user.uid));
      }
    } catch (error) {
      yield put(showAuthMessage(error));
    }
  });
}

export function* signInWithFBGoogle() {
  yield takeEvery(SIGNIN_WITH_GOOGLE, function* () {
    try {
      const user = yield call(FirebaseService.signInGoogleRequest);
      if (user.message) {
        yield put(showAuthMessage(user.message));
      } else {
        localStorage.setItem(AUTH_TOKEN, user.user.uid);
        loginOrganization(user.user.uid);

        yield put(signInWithGoogleAuthenticated(user.user.uid));
      }
    } catch (error) {
      yield put(showAuthMessage(error));
    }
  });
}

export function* signInWithFacebook() {
  yield takeEvery(SIGNIN_WITH_FACEBOOK, function* () {
    try {
      const user = yield call(FirebaseService.signInFacebookRequest);
      if (user.message) {
        yield put(showAuthMessage(user.message));
      } else {
        localStorage.setItem(AUTH_TOKEN, user.user.uid);
        loginOrganization(user.user.uid);

        yield put(signInWithFacebookAuthenticated(user.user.uid));
      }
    } catch (error) {
      yield put(showAuthMessage(error));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(signInWithFBEmail),
    fork(signOut),
    fork(signUpWithFBEmail),
    fork(signInWithFBGoogle),
    fork(signInWithFacebook),
  ]);
}
