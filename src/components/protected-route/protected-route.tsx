import { Route, Redirect } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';

type Props = React.ComponentProps<typeof Route>;

function ProtectedRoute({ children, ...rest }: Props) {
  const token = useAppSelector((state) => state.auth.token);

  return (
    <Route {...rest}>{!!token ? children : <Redirect to="/login" />}</Route>
  );
}

export default ProtectedRoute;
