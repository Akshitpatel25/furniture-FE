import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const authContext = useContext(AuthContext);
  const { user, token, isLoading, logout } = authContext || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!token || !user) {
      navigate('/login', { replace: true });
      return;
    }

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role || '')) {
      logout?.();
      navigate('/login', { replace: true });
      return;
    }
  }, [isLoading, token, user, allowedRoles, navigate, logout]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!token || !user) {
    return null;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role || '')) {
    return null;
  }

  return <>{children}</>;
};
