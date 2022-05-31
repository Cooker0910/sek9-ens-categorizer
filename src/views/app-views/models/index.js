import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';

const Models = ({ match }) => (
  <Suspense fallback={<Loading cover="content"/>}>
    <Switch>
      <Route path={`${match.url}/category`} component={lazy(() => import(`./category`))} />
      <Redirect from={`${match.url}`} to={`${match.url}/category`} />
    </Switch>
  </Suspense>
);

export default Models;