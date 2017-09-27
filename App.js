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



class DrawerNavigatorShareView extends Component {


	render() {
		return (
			<Text>DrawerNavigatorShareView</Text>
		);
	}
}

class DrawerNavigatorIntegralView extends Component {
	render() {
		return (
			<Text>DrawerNavigatorIntegralView</Text>
		);
	}
}

class DrawerAboutUsView extends Component {
	render() {
		return (
			<Text>DrawerAboutUsView</Text>
		);
	}
}

//TabNavigatorView
class TabNavigatorConsultationView extends Component {

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

class TabNavigatorConsultationViewForumView extends Component {
	render() {
		return (
			<Text>ForumView</Text>
		);
	}
}

class TabNavigatorConsultationViewRankingListView extends Component {
	render() {
		return (
			<Text>RankingListView</Text>
		);
	}
}

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
}, {
	navigationOptions: {
		headerBackTitle: 'Back',
		headerTintColor: '#333333',
		showIcon: true,
		swipeEnabled: false,
		animationEnabled: false,

	},

	mode: 'card',
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