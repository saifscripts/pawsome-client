import { RoleBasedRoutes } from '@/middleware';
import { getCurrentUser, logoutUser } from '@/services/auth-services';
import { IUser, IUserRole } from '@/types';
import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

interface IAuthProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
}

const AuthContext = createContext<IAuthProviderValues | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();

      setUser(user);
      setIsLoading(false);
    })();
  }, [isLoading]);

  const logout = () => {
    logoutUser();
    setIsLoading(true);

    if (
      RoleBasedRoutes[user?.role as IUserRole].some((route: RegExp | string) =>
        pathname.match(route)
      )
    ) {
      router.push('/');
    }
  };

  const value = { user, setUser, isLoading, setIsLoading, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth is used outside the AuthProvider');
  }

  return context;
};

export default AuthProvider;