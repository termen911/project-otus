import { SignInIcon } from '@/features/auth-sign-in';
import { UserMenu } from '@/features/user-menu/ui/UserMenu';
import { useSessionStore } from '@/entities/session';
import { useLocation } from 'react-router';

export const AuthStatusIndicator = () => {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);

  const location = useLocation();

  if (location.pathname === '/auth/signin' || location.pathname === '/auth/signup') {
    return null;
  }

  return isAuthenticated ? <UserMenu /> : <SignInIcon />;
};
