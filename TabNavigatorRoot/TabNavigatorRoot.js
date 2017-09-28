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
	TabNavigator
} from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

// const BANNER_IMGS = [
// 	require('../images/banner/1.jpg'),
// 	require('../images/banner/2.jpg'),
// 	require('../images/banner/3.jpg'),
// 	require('../images/banner/4.jpg')
// ];

class ConsultationView extends Component {

	static navigationOptions = ({
		navigation
	}) => ({
		headerLeft: <Text onPress = {() => navigation.navigate('DrawerOpen')}>
		  	More
		</Text>,
	});

	componentDidMount() {
		this.timer = setTimeout(() => SplashScreen.hide(), 2000);
	}

	componentWillMount() {
		this.timer && clearTimeout(this.timer);
	}

	render() {
		const {
			navigate
		} = this.props.navigation;
		return ( < Text onPress = {
				() => {
					navigate('DrawerOpen');
					Alert.alert('sdasdasd');
					console.log('ttttttttttttttt');
				}
			} > ConsultationView < /Text>);
		}
	}

	class ForumView extends Component {
		render() {
			return (
				<Text>ForumView</Text>
			);
		}
	}

	class RankingListView extends Component {
		render() {
			return (
				<Text>RankingListView</Text>
			);
		}
	}

	const RootTabNavigationBar = TabNavigator({
		Consultation: {
			screen: ConsultationView,
		},
		Forum: {
			screen: ForumView,
		},
		RankingList: {
			screen: RankingListView,
		},
	}, {
		tabBarPosition: 'bottom',
	});


	export default class TabNavigatorRoot extends Component {
		render() {
			return (
				<RootTabNavigationBar />
			);
		}
	}

	const styles = StyleSheet.create({

	});