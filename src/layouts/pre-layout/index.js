import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PreViews from "views/pre-views";
import Loading from "components/shared-components/Loading";
import { useThemeSwitcher } from "react-css-theme-switcher";

export const AuthLayout = () => {
  const { status } = useThemeSwitcher();

  if (status === "loading") {
    return <Loading cover="page" />;
  }

  return (
    <div className="auth-container">
      <Switch>
        <Route path="" component={PreViews} />
        <Redirect from="/support" to="/support/help-center" />
      </Switch>
    </div>
  );
};

export default AuthLayout;
