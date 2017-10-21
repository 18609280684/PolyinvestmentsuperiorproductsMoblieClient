'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Button,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  Alert
} from 'react-native';
import {
	scaleSize,
	setSpText,
	deviceWidth
} from '../Public/ScreenAdaptationUtil.js';
import {
  RequestUrl,
  Banner_Imgs,
  Constants
} from '../Public/Constants.js';
import{
	ToastShow
} from '../Public/Utils.js';

//
class DrawerNavigatorInformationView extends Component {
	static navigationOptions = ({
		navigation
	}) => ({
		headerLeft: <Button onPress = {() => navigation.goBack()} 
						title = 'Back'/>
	});

	render() {
		const{navigation} = this.props;
		return (
			<View style={{flex: 1,backgroundColor:'#071C2D'}}>
				<View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center', height:scaleSize(120),backgroundColor:'#000000'}}>
						<Text style = {{fontSize:setSpText(15), color:'#F3D671',}} onPress = {() => navigation.goBack()}>     返回</Text>
						<Text style = {{fontSize:setSpText(20), color:'#F3D671',}}>个人信息         </Text>
						<Text></Text>
				</View>
				<View style={{flex: 0.4,}}>
					<View style={{flex: 0.2,height:scaleSize(84),}}>
						<View style = {{backgroundColor:'rgb(34,52,67)'}}>
							<Image
						  		style={{height:scaleSize(2)}}
						  		source={Banner_Imgs.INFORMATION_BGFORM}
							/>
						</View>
						<View style={{alignItems:'center',flexDirection:'row'}}>
							<Image
              					style={{height:scaleSize(32),width:scaleSize(32),marginLeft:scaleSize(30)}}
              					source={Banner_Imgs.INFORMATION_NICKNAMEICON} />
             			 	<TextInput  style={{marginLeft:scaleSize(30),width:scaleSize(360),fontSize:setSpText(13),color:'#F3D671'}}  
               					onChangeText={(text) => this.setState({
                      			password:Text,
                				})} 
                				placeholder = "昵称" 
                				placeholderTextColor  = 'gray'
             					secureTextEntry  = {true}
              					underlineColorAndroid = 'transparent'
              				/>
						</View>
					</View>
					<View style={{flex: 0.2,}}>
						<View style = {{backgroundColor:'rgb(34,52,67)'}}>
							<Image
						  		style={{height:scaleSize(2)}}
						  		source={Banner_Imgs.INFORMATION_BGFORM}
							/>
						</View>
						<View style={{alignItems:'center',flexDirection:'row'}}>
							<Image
              					style={{height:scaleSize(32),width:scaleSize(32),marginLeft:scaleSize(30)}}
              					source={Banner_Imgs.INFORMATION_BIRTHDAYICON} />
             			 	<TextInput  style={{marginLeft:scaleSize(30),width:scaleSize(360),fontSize:setSpText(13),color:'#F3D671'}}  
               					onChangeText={(text) => this.setState({
                      			password:Text,
                				})} 
                				placeholder = "出生年月" 
                				placeholderTextColor  = 'gray'
             					secureTextEntry  = {true}
              					underlineColorAndroid = 'transparent'
              				/>
						</View>
					</View>
					<View style={{flex: 0.2,}}>
						<View style = {{backgroundColor:'rgb(34,52,67)'}}>
							<Image
						  		style={{height:scaleSize(2)}}
						  		source={Banner_Imgs.INFORMATION_BGFORM}
							/>
						</View>
						<View style={{alignItems:'center',flexDirection:'row'}}>
							<Image
              					style={{height:scaleSize(32),width:scaleSize(32),marginLeft:scaleSize(30)}}
              					source={Banner_Imgs.INFORMATION_GENDERICON} />
             			 	<TextInput  style={{marginLeft:scaleSize(30),width:scaleSize(360),fontSize:setSpText(13),color:'#F3D671'}}  
               					onChangeText={(text) => this.setState({
                      			password:Text,
                				})} 
                				placeholder = "性别" 
                				placeholderTextColor  = 'gray'
             					secureTextEntry  = {true}
              					underlineColorAndroid = 'transparent'
              				/>
						</View>
					</View>
					<View style={{flex: 0.2,}}>
						<View style = {{backgroundColor:'rgb(34,52,67)'}}>
							<Image
						  		style={{height:scaleSize(2)}}
						  		source={Banner_Imgs.INFORMATION_BGFORM}
							/>
						</View>
						<View style={{alignItems:'center',flexDirection:'row'}}>
							<Image
              					style={{height:scaleSize(32),width:scaleSize(32),marginLeft:scaleSize(30)}}
              					source={Banner_Imgs.INFORMATION_TELEPHONEICON} />
             			 	<TextInput  style={{marginLeft:scaleSize(30),width:scaleSize(360),fontSize:setSpText(13),color:'#F3D671'}}  
               					onChangeText={(text) => this.setState({
                      			password:Text,
                				})} 
                				placeholder = "电话" 
                				placeholderTextColor  = 'gray'
             					secureTextEntry  = {true}
              					underlineColorAndroid = 'transparent'
              				/>
						</View>
					</View>
					<View style={{flex: 0.2,}}>
						<View style = {{backgroundColor:'rgb(34,52,67)'}}>
							<Image
						  		style={{height:scaleSize(2)}}
						  		source={Banner_Imgs.INFORMATION_BGFORM}
							/>
						</View>
						<View style={{alignItems:'center',flexDirection:'row'}}>
							<Image
              					style={{height:scaleSize(32),width:scaleSize(32),marginLeft:scaleSize(30)}}
              					source={Banner_Imgs.INFORMATION_MAILBOXICON} />
             			 	<TextInput  style={{marginLeft:scaleSize(30),width:scaleSize(360),fontSize:setSpText(13),color:'#F3D671'}}  
               					onChangeText={(text) => this.setState({
                      			password:Text,
                				})} 
                				placeholder = "邮箱" 
                				placeholderTextColor  = 'gray'
             					secureTextEntry  = {true}
              					underlineColorAndroid = 'transparent'
              				/>
						</View>
						<View style = {{backgroundColor:'rgb(34,52,67)'}}>
								<Image
						  			style={{height:scaleSize(2)}}
						  			source={Banner_Imgs.INFORMATION_BGFORM}
								/>
							</View>
						</View>
				</View>
				<View style={{flex: 0.2,alignItems:'center',justifyContent:'center'}}>
					<TouchableHighlight   onPress={() => {
						ToastShow('提交成功',Constants.TOAST_LONG);
					}}>
                		<Image  style={{height:scaleSize(72),width:scaleSize(420),}}
                  		source={Banner_Imgs.INFORMATION_SUBMITBUTTON}/>
            		</TouchableHighlight>
				</View>
			</View>
		);
	}
}

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

const styles = StyleSheet.create({

});


export  {
	DrawerNavigatorInformationView,
	DrawerNavigatorShareView,
	DrawerAboutUsView,
};