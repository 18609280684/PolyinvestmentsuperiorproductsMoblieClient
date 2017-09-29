'use strict';

import React, {
	Component
} from 'react';

import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Button,
	Alert
} from 'react-native';
import Spinner from 'react-native-spinkit';

class Login extends Component {

	constructor(props) {
		super(props);

		this.state = {
			text: '请填入数据',

			sVisible: true,
			types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
			size: 100,
			color: "#00FF00",
		};
	}

	static navigationOptions = ({
		navigation
	}) => ({
		header: false,
		// header: false,
	});

	render() {
		const {
			navigation
		} = this.props;

		return (
			<View style={styles.login}>
			<Spinner style={{ marginBottom: 50}} isVisible={this.state.isVisible} size={this.state.size} type={this.state.types[7]} color={this.state.color} />
				<Text>
				  登录
				</Text>
				<TextInput style={{height: 40, width:300,borderColor: 'gray', borderWidth: 1}}
						   onChangeText = {(text) => this.setState({text})}
						   value = {this.state.Text} 
						   defaultValue = '用户名'
						    />
				<TextInput style={{height: 40, width:300,borderColor: 'gray', borderWidth: 1}}
						   onChangeText = {(text) => this.setState({text})}
						   value = {this.state.Text} 
						   defaultValue = '密码'
						    />

				<Button onPress = {() => {
					Alert.alert('提交成功')
					navigation.goBack();
				}}
					title = '提交'/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	login: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
});


export default Login;