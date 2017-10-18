import React, {
	Component
} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Button,
	Alert
} from 'react-native';
import {
	StackNavigator,
	DrawerNavigator,
	TabNavigator
} from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import {
	Login,
	RegisterView,
	ForgetPasswordView
} from './Login.js';
import {
	RootTabNavigationBar,
	ConsultationViewDetailView,
	ForeignExchangeDetailView,
	ForumViewDetail
} from './TabNavigatorRoot/TabNavigatorRoot.js';


class DrawerNavigatorShareView extends Component {
	static navigationOptions = ({
		navigation
	}) => ({
		headerLeft: <Button onPress = {() => navigation.goBack()} 
						title = 'Back'/>
	});

	render() {
		return (
			<Text>DrawerNavigatorShareView</Text>
		);
	}
}

//
class DrawerNavigatorIntegralView extends Component {
	static navigationOptions = ({
		navigation
	}) => ({
		headerLeft: <Button onPress = {() => navigation.goBack()} 
						title = 'Back'/>
	});

	render() {
		return (
			<Text>DrawerNavigatorIntegralView</Text>
		);
	}
}

//
class DrawerAboutUsView extends Component {
	static navigationOptions = ({
		navigation
	}) => ({
		headerLeft: <Button onPress = {() => navigation.goBack()} 
						title = 'Back'/>
	});

	render() {
		return (
			<Text>DrawerAboutUsView</Text>
		);
	}
}


const RootDrawerNavigator = DrawerNavigator({
	Home: {
		screen: RootTabNavigationBar,
	},
	Share: {
		screen: DrawerNavigatorShareView,
	},
	Integral: {
		screen: DrawerNavigatorIntegralView,
	},
	AboutUs: {
		screen: DrawerAboutUsView,
	},
});



const RootStackNavigator = StackNavigator({
	Home: {
		screen: RootDrawerNavigator,
	},
	Login: {
		screen: Login,
	},
	RegisterView: {
		screen: RegisterView,
	},
	ForgetPasswordView: {
		screen: ForgetPasswordView,
	},
	ConsultationViewDetailView: {
		screen: ConsultationViewDetailView,
	},
	ForeignExchangeDetailView:{
		screen:ForeignExchangeDetailView,
	},
	ForumViewDetail:{
		screen:ForumViewDetail,
	},
}, {
	navigationOptions: ({
		navigation
	}) => ({
		header:false,
		headerTitle: '首页',
		headerTitleStyle: {
			alignSelf: 'center',
		},
		// headerLeft: <Button onPress = {() => navigation.goBack()}
		// 	title = 'Back'/>
	}),

	mode: 'card',
});

export default class App extends Component {

	componentDidMount() {
		this.timer = setTimeout(() => SplashScreen.hide(), 2000);
	}

	componentWillMount() {
		this.timer && clearTimeout(this.timer);
	}

	render() {
		return (

			//<RootStackNavigator />
			
			<Login />
			//<ForgetPasswordView />
			//<RootTabNavigationBar />
			//<RootDrawerNavigator />
		);
	}
}

const styles = StyleSheet.create({

});