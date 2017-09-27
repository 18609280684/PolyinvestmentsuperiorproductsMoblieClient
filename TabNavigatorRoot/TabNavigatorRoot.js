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

const BANNER_IMGS = [
	require('../images/banner/1.jpg'),
	require('../images/banner/2.jpg'),
	require('../images/banner/3.jpg'),
	require('../images/banner/4.jpg')
];

class ConsultationView extends Component {
	render() {
		return (
			<Text>ConsultationView</Text>
		);
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