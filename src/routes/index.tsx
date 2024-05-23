import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '@/contexts/auth';
import { AppRouter } from './app';
import AuthRoutes from './auth/auth.routes';

const Routes: React.FC = () => {
  const { signed, loading, user, route } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  if (signed) {
    return <AppRouter />
  }

  return <AuthRoutes />;
};

export default Routes;
