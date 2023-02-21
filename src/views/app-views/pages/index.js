import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const Pages = ({ match }) => (
  <Suspense fallback={<Loading cover="content" />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/search/result/%20`}
      />
      <Route
        path={`${match.url}/search/result/:id`}
        component={lazy(() => import(`./search`))}
      />
      <Route
        path={`${match.url}/search/result`}
        component={lazy(() => import(`./search`))}
      />
      <Route
        path={`${match.url}/:organization_id/:campaign_id/single/data`}
        component={lazy(() => import(`./campaign-preview`))}
      />
      {console.log(`${match.url}/`)}
    </Switch>
  </Suspense>
);

export default Pages;
