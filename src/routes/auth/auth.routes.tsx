import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import SignIn from '@/pages/auth/SignIn';

const AuthStack = createNativeStackNavigator();

const AuthRoutes: React.FC = () => {

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
          headerShadowVisible: false,
        }}
      />

    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
