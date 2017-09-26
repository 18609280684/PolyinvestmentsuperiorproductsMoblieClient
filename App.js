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



class RootStackNavigatorHome extends Component {
	// static navigationOptions = {
	// 	header: false,
	// };
	componentDidMount() {
		this.timer = setTimeout(
			() => SplashScreen.hide(), 3000
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
			< Button onPress = {() => navigate('DrawerOpen')}
				title = 'Touch me' / > 
			
			</View>


		);
	}
}
class RootStackNavigatorOthers extends Component {
	render() {
		return (
			<Text>RootStackNavigatorOthers</Text>
		);
	}
}

const RootTabNavigationBar = TabNavigator({
	Consultation: {
		screen: RootStackNavigatorHome,
	},
	Forum: {
		screen: RootStackNavigatorOthers,
	},
	RankingList: {
		screen: RootStackNavigatorOthers,
	},
}, {
	tabBarPosition: 'bottom',
});

const RootDrawerNavigator = DrawerNavigator({
	Home: {
		screen: RootTabNavigationBar
	},
	Others: {
		screen: RootStackNavigatorOthers
	},

});

const RootStackNavigator = StackNavigator({
	Home: {
		screen: RootDrawerNavigator
	},
	Others: {
		screen: RootStackNavigatorOthers
	}
});

export default class App extends Component {
	render() {
		return (
			//<RootStackNavigator />
			//<RootTabNavigationBar />
			<RootDrawerNavigator />
		);
	}
}

const styles = StyleSheet.create({

});