import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { LoginPageContainer } from '../Auth/container/login.container';
import { RegistartionPageContainer } from '../Auth/container/registration.container';
import { APP_KEYS } from '../common/consts';
import { STORAGE_KEYS } from '../common/consts/app-keys.const';
import { InfoTodoPageContainer, TodoPageContainer } from '../todo/containers';
import { MainNavContainer } from '../Auth/container/main-nav.container';
import { ProfileContainer } from '../profile/container/profile.container';

export const MainRouter = () => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

  return (
    <Router>
      <Switch>
        <Route path="/">
          {token ? (
            <Redirect to={APP_KEYS.ROUTER_KEYS.TODOS} />
          ) : (
            <Redirect to={APP_KEYS.ROUTER_KEYS.HOME} />
          )}
          <Route component={MainNavContainer} path={APP_KEYS.ROUTER_KEYS.HOME} />
          <Route component={LoginPageContainer} path={APP_KEYS.ROUTER_KEYS.LOGIN} />
          <Route component={RegistartionPageContainer} path={APP_KEYS.ROUTER_KEYS.REGISTRATION} />
          <Route component={TodoPageContainer} path={APP_KEYS.ROUTER_KEYS.TODOS} />
          <Route component={InfoTodoPageContainer} path={APP_KEYS.ROUTER_KEYS.TODO} />
          <Route component={ProfileContainer} path={APP_KEYS.ROUTER_KEYS.PROFILE} />
        </Route>
      </Switch>
    </Router>
  );
};
