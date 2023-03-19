import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppLayout from "layouts/app-layout";
import AuthLayout from "layouts/auth-layout";
import PreLayout from "layouts/pre-layout";
import PageNotFound from "views/auth-views/errors/error-page-1";
import AppLocale from "lang";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import {
  APP_PREFIX_PATH,
  AUTH_PREFIX_PATH,
  PRE_PREFIX_PATH,
} from "configs/AppConfig";
import useBodyClass from "hooks/useBodyClass";
import { useAuth } from "contexts/AuthContext";
import {
  AUTH_ORGANIZATION,
  AUTH_ORGANIZATION_LIST,
  ACCESS_TOKEN,
  PROFILE_URL,
  SESSION_TOKEN,
} from "../redux/constants/Auth";
function RouteInterceptor({
  children,
  isAuthenticated,
  isAccessToken,
  redirect,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: `${PRE_PREFIX_PATH}/`,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export const Views = (props) => {
  const { locale, token, location, direction, redirect } = props;
  // console.log(redirect);
  const currentAppLocale = AppLocale[locale];
  const {
    setOrganization,
    setOrganizationMemberList,
    authorizationConfig,
    setPhoto,
  } = useAuth();
  const user = JSON.parse(localStorage.getItem(PROFILE_URL) || "[]");

  useBodyClass(`dir-${direction}`);
  useEffect(() => {
    //set GLobalContext When Refreshed
    setOrganization(localStorage.getItem(AUTH_ORGANIZATION));
    setOrganizationMemberList(localStorage.getItem(AUTH_ORGANIZATION_LIST));
    authorizationConfig(localStorage.getItem(ACCESS_TOKEN));
    setPhoto(user);
    // async function getOrganization(token) {
    //   // Make the initial query
    //   console.log("token", token);
    //   const query = await db
    //     .collection("users")
    //     .where("age", "==", Number(token))
    //     .get();
    //   if (!query.empty) {
    //     const snapshot = query.docs[0];
    //     const data = snapshot.data();
    //     console.log(data);
    //   } else {
    //     // not found
    //   }
    // }
    // getOrganization(token);
  }, []);
  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
        <Switch>
          <Route exact path="/">
            <Redirect to={APP_PREFIX_PATH} />
          </Route>

          <Route path={AUTH_PREFIX_PATH}>
            <AuthLayout direction={direction} />
          </Route>
          <RouteInterceptor
            path={APP_PREFIX_PATH}
            isAuthenticated={token}
            redirect={redirect}
          >
            <AppLayout direction={direction} location={location} />
          </RouteInterceptor>
          {/* <RouteInterceptor path={APP_PREFIX_PATH} isAuthenticated={token}>
            <AppLayout direction={direction} location={location} />
          </RouteInterceptor> */}
          <RouteInterceptor
            path={PRE_PREFIX_PATH}
            isAuthenticated={!token}
            redirect={redirect}
          >
            <PreLayout direction={direction} />
          </RouteInterceptor>
          {/* <Route path={PRE_PREFIX_PATH}>
            <PreLayout direction={direction} />
          </Route> */}

          <Route path="*" component={PageNotFound} />
        </Switch>
      </ConfigProvider>
    </IntlProvider>
  );
};

const mapStateToProps = ({ theme, auth }) => {
  const { locale, direction } = theme;
  const { token, redirect } = auth;
  return { locale, direction, token, redirect };
};

export default withRouter(connect(mapStateToProps)(Views));
