import { lazy } from 'react';
import { Switch, Redirect, useLocation } from 'react-router-dom';
import ProtectedRoute from 'components/protected-route/protected-route';
const Dashboard = lazy(()=> import('pages/dashboard/Dashboard'))
const ArticlePreview = lazy(()=> import('pages/dashboard/ArticlePreview'))





function PageRoutes() {
  const location = useLocation();

  return (
    <Switch location={location}>
      <ProtectedRoute path={['/','/dashboard']} exact>
        <Dashboard />
      </ProtectedRoute>
      <ProtectedRoute path='/dashboard/:id' exact>
        <ArticlePreview />
      </ProtectedRoute>
      
      {/* <ProtectedRoute path="/settings" exact>
        <Settings />
      </ProtectedRoute> */}
      <Redirect to="/error404" />
    </Switch>
  );
}

export default PageRoutes;
