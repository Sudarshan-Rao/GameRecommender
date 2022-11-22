import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../CustomHooks/useAuth';

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(`auth
    ${JSON.stringify(auth)}`);
  console.log('Require Auth' + auth?.accessToken);

  return auth?.accessToken ? ( //changed from user to accessToken to persist login after refresh
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
