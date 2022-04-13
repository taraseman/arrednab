import { lazy } from 'react';
import { Switch, Redirect, useLocation, useRouteMatch } from 'react-router-dom';
import ProtectedRoute from 'components/protected-route/protected-route';

// const LaborItems = lazy(() => import('pages/settings/labor-items/labor-items'));
const Dashboard = lazy(()=> import('pages/dashboard/Dashboard'))





function PageRoutes() {
  const location = useLocation();
  const topLevelPath = useRouteMatch<{ path: string }>('/:path')?.params.path;
//   useTranslation(topLevelPath ? topLevelPath : undefined);

  return (
    <Switch location={location}>
      <ProtectedRoute path={['/', '/dashboard']} exact>
        <Dashboard />
      </ProtectedRoute>
      
      {/* <ProtectedRoute path="/settings" exact>
        <Settings />
      </ProtectedRoute> */}
      <Redirect to="/error404" />
    </Switch>
  );
}

export default PageRoutes;
