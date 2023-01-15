import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const Account = ({ match }) => (
  <Suspense fallback={<Loading cover="content" />}>
    <Switch>
      <Route
        path={`${match.url}/settings/profile/:id`}
        component={lazy(() => import(`./profile/`))}
      />
      <Route
        path={`${match.url}/settings/invoice/:id`}
        component={lazy(() => import(`./settings/Profile/invoice/Invoice`))}
      />
      <Redirect exact from={`${match.url}`} to={`${match.url}/settings`} />
      <Route
        path={`${match.url}/settings`}
        component={lazy(() => import(`./settings`))}
      />
    </Switch>
  </Suspense>
);

export default Account;
