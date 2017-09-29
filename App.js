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
import Login from './Login.js';
// import RootTabNavigationBar from './TabNavigatorRoot/TabNavigatorRoot.js';


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

//TabNavigatorView
class TabNavigatorConsultationView extends Component {
	static navigationOptions = ({
		navigation
	}) => ({
		headerLeft: < Button onPress = {
			() => {
				navigation.navigate('DrawerOpen');
			}
		}
		title = 'More' / > ,
		// header: false,
	});

	//SplashScreen设置
	componentDidMount() {
		this.timer = setTimeout(
			() => SplashScreen.hide(), 2000
		);
	}

	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
	}

	render() {
		const {
			navigate
		} = this.props.navigation;
		return (
			<View style = {{flex:1}}>
			< Button onPress = {() => navigate('Login')}
				title = 'Touch me' / > 
			
			</View>
		);
	}
}

//
class TabNavigatorConsultationViewForumView extends Component {
	render() {
		const {
			navigate
		} = this.props.navigation;
		return ( < Text onPress = {
				() => navigate('')
			} > ForumView < /Text>

		);
	}
}

//
class TabNavigatorConsultationViewRankingListView extends Component {
	render() {
		return (
			<Text>RankingListView</Text>
		);
	}
}

//
const RootTabNavigationBar = TabNavigator({
	Consultation: {
		screen: TabNavigatorConsultationView,
	},
	Forum: {
		screen: TabNavigatorConsultationViewForumView,
	},
	RankingList: {
		screen: TabNavigatorConsultationViewRankingListView,
	},
}, {
	tabBarPosition: 'bottom',
});


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
}, {
	navigationOptions: ({
		navigation
	}) => ({
		headerTitle: '首页',
		headerTitleStyle: {
			alignSelf: 'center',
		},
		// headerLeft: <Button onPress = {() => navigation.goBack()}
		// 	title = 'Back'/>
	}),

	mode: 'modal',
});

export default class App extends Component {
	render() {
		return (
			<RootStackNavigator />
			//<RootTabNavigationBar />
			//<RootDrawerNavigator />
		);
	}
}

const styles = StyleSheet.create({

});