import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Dimensions } from 'react-native';

import { useAuth } from '@/contexts/auth';
import { color } from '@/styles/color';
import { StakCards } from './card/stak-card';
import { StakHome } from './home/stack-home';
import { Icons } from './icon';
import { StakPost } from './postos/stak-postos';
import { StakSetting } from './setting/stak-setting';
import * as S from './styles';

const Tab = createBottomTabNavigator();



function MyTabBar({ state, descriptors, navigation }: any) {
  return (
    <S.bar style={{ flexDirection: 'row', height: 86 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <S.button
            focused={isFocused}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ display: 'flex', flexDirection: 'row' }}
          >

            <Icons isFocused={isFocused} index={index} />

            {isFocused && (
              <S.label focused={isFocused} >
                {label}
              </S.label>

            )}
          </S.button>
        );
      })}
    </S.bar>
  );
}

export function AppRouter() {
  const { user } = useAuth();

  const getTabBarIconColor = (focused: boolean) => {
    const focusedColor = color.focus.regular
    const nonFocusedColor = '#7B7B7B';

    return focused ? focusedColor : nonFocusedColor;
  };
  const width = Dimensions.get('screen').width;

  const zoomOut = {
    0: {
      opacity: 1,
      scale: 1,
      marginLeft: 0,
    },
    0.5: {
      opacity: 1,
      scale: 0.3,
      marginLeft: -50,
    },
    1: {
      opacity: 0,
      scale: 0,
      marginLeft: -150,
    },
  };

  const zoomIm = {
    0: {
      opacity: 0,
      marginLeft: -150,
      scale: 0,
    },
    0.5: {
      opacity: 0.5,
      marginLeft: -50,
      scale: 0.3,
    },
    1: {
      opacity: 1,
      scale: 1,
      marginLeft: 0,
    },
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen name='home' component={StakHome}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen options={{ title: 'Postos' }} name='postos' component={StakPost} />
      <Tab.Screen options={{ title: 'Cartões' }} name='cartao' component={StakCards} />
      <Tab.Screen options={{ title: 'Configurações' }} name='settings' component={StakSetting} />

    </Tab.Navigator>
  );

}
