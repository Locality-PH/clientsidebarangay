import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';

const Account = ({ match }) => (
  <Suspense fallback={<Loading cover="content"/>}>
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/settings`} />
      <Route path={`${match.url}/settings`} component={lazy(() => import(`./settings`))} />
    </Switch>
  </Suspense>
);

export default Account;