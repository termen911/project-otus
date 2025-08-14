import { useSessionStore } from '@/entities/session';
import { Flex, Spin } from 'antd';
import { useEffect, useState } from 'react';

interface AppInitializerProps {
  children: React.ReactNode;
}

export const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const { validateToken } = useSessionStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await validateToken();
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [validateToken]);

  if (!isInitialized) {
    return (
      <Flex justify="center" align="center" style={{ height: '100vh' }}>
        <Spin size="large" />
      </Flex>
    );
  }

  return <>{children}</>;
};
