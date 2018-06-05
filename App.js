/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	Animated,
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Text,
	StatusBar,
	View,
} from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import { TabNavigator, TabBarBottom } from 'react-navigation';
import TodayScreen from './components/today';  // 从HomeScreen页面导入HomeScreen组件，HomeScreen其实是表示HomeScreen.js。./表示当前页面，不可删除
import ForecastScreen from './components/forecast'; 


const ExampleInfo = {
	TodayScreen: {
		name: 'TodayScreen',
		description: 'TodayScreen',
	},
	ForecastScreen: {
		name: 'ForecastScreen',
		description: 'ForecastScreen',
	}
};

const ExampleRoutes = {
	TodayScreen,
	ForecastScreen
};


class MainScreen extends React.Component<any, State> {
	render() {
		return (
			<TodayScreen />
		);
	}
}

const AppNavigator = TabNavigator(
	{
		Today: { screen: TodayScreen },
		Forecast: { screen: ForecastScreen },
	},
	{
		navigationOptions: ({ navigation }) => ({
			tabBarLabel: ({ focused, tintColor }) => {
				const { routeName } = navigation.state;
				let iconName;
				if (routeName === 'Today') {
					iconName = '今天天气';
				} else if (routeName === 'Forecast') {
					iconName = '未来天气';
				}

				// You can return any component that you like here! We usually use an
				// icon component from react-native-vector-icons
				return iconName;
			},
			tabBarIcon: ({ focused, tintColor }) => {
				const { routeName } = navigation.state;
				let iconName;
				if (routeName === 'Today') {
					iconName = `ios-information-circle${focused ? '' : '-outline'}`;
				} else if (routeName === 'Forecast') {
					iconName = `ios-options${focused ? '' : '-outline'}`;
				}

				// You can return any component that you like here! We usually use an
				// icon component from react-native-vector-icons
				return null;
			},
		}),
		tabBarComponent: TabBarBottom,
		tabBarPosition: 'bottom',
		tabBarOptions: {
			activeTintColor: 'tomato',
			inactiveTintColor: 'gray',
			labelStyle: {
				fontSize: 24,
				lineHeight: 28,
				height: 28,
			},
		},
		animationEnabled: false,
		swipeEnabled: false,
	}
);

export default AppNavigator;