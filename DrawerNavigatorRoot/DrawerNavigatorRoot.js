import React, {
	Component
} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View
} from 'react-native';
import {
	StackNavigator,
	DrawerNavigator
} from 'react-navigation';

class DrawerNavigatorHome extends Component {
	render() {
		return (
			<Text>DrawerNavigatorHome</Text>
		);
	}
}

class DrawerNavigatorOthers extends Component {
	render() {
		return (
			<Text>DrawerNavigatorOthers</Text>
		);
	}
}

const RootDrawerNavigator = DrawerNavigator({
	Home: {
		screen: DrawerNavigatorHome
	},
	Others: {
		screen: DrawerNavigatorOthers
	},
});

export default class DrawerNavigatorRoot extends Component {
	render() {
		return (
			<RootDrawerNavigator />
		);
	}
}
const styles = StyleSheet.create({

});