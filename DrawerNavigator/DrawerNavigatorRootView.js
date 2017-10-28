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
  Alert,
  ScrollView
} from 'react-native';
import {
	scaleSize,
	setSpText,
	deviceWidth,
	deviceHeight
} from '../Public/ScreenAdaptationUtil.js';
import {
  RequestUrl,
  Banner_Imgs,
  Constants
} from '../Public/Constants.js';
import{
	ToastShow
} from '../Public/Utils.js';
import Cookie from 'react-native-cookie';
import Icon from 'react-native-vector-icons/FontAwesome';

var cookieCustomerId = '';
//
class DrawerNavigatorInformationView extends Component {
	static navigationOptions = ({
		navigation
	}) => ({
		headerLeft: <Button onPress = {() => navigation.goBack()} 
						title = 'Back'/>
	});

	constructor(props) {
	  super(props);
	  const{navigate} = this.props.navigation;
	Cookie.get(RequestUrl.LOGIN_URL, 'customerId').then((cookie) => {
		if (cookie != null && cookie != '') {
			cookieCustomerId = cookie;
		}else{
			ToastShow('请重新登录',Constants.TOAST_SHORT);
			navigate('Login');
		}
	});
	  this.state = {
	  	nickname:'',
	  	signature:'',
	  	birthday:'',
	  	sex:'',
	  	telephone:'',
	  	mailbox:'',
	  	iDnumber:'',
	  	bankCardNumber:'',
	  };
	}

	fetchData(){
		const{navigation} = this.props;
		console.log('cookieCustomerId:' + cookieCustomerId);
		fetch(RequestUrl.PERSONALINFORMATION_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'customerId=' + cookieCustomerId + '&' + 'customerName=' + this.state.nickname + '&' + 'dateBirth=' + this.state.birthday + '&' + 'sex=' + this.state.sex + '&' + 'telephone=' + this.state.telephone
          	+ '&' + 'email=' + this.state.mailbox + '&' + 'autograph=' + this.state.signature  + '&' + 'pinCode=' + this.state.iDnumber + '&' + 'bankCardNumber=' + this.state.bankCardNumber
        })
		.then((response) => response.json())
		.then((responseData) => {

			if (responseData.success) {
          		Cookie.set(RequestUrl.LOGIN_URL, 'customerName',this.state.nickname).then(() => console.log('customerName'));
          		Cookie.set(RequestUrl.LOGIN_URL, 'autograph',this.state.signature ).then(() => console.log('autograph'));
          		Cookie.set(RequestUrl.LOGIN_URL, 'dateBirth',this.state.birthday).then(() => console.log('dateBirth'));
          		Cookie.set(RequestUrl.LOGIN_URL, 'sex',this.state.sex).then(() => console.log('sex'));
          		Cookie.set(RequestUrl.LOGIN_URL, 'telephone',this.state.telephone).then(() => console.log('telephone'));
          		Cookie.set(RequestUrl.LOGIN_URL, 'email',this.state.mailbox).then(() => console.log('email')); 		
          		Cookie.set(RequestUrl.LOGIN_URL, 'pinCode',this.state.iDnumber).then(() => console.log('pinCode'));
          		Cookie.set(RequestUrl.LOGIN_URL, 'bankCardNumber',this.state.bankCardNumber).then(() => console.log('bankCardNumber'));
				navigation.goBack();
				ToastShow('提交成功',Constants.TOAST_SHORT);
			}else{
				ToastShow('提交失败',Constants.TOAST_SHORT);
			}
		})
		.catch()
		.done();
	}

	render() {
		const{navigation} = this.props;
		var _scrollView: ScrollView;
		return (

			<ScrollView
        		ref={(scrollView) => { _scrollView = scrollView; }}
        		automaticallyAdjustContentInsets={true}
        		onScroll={() => { console.log('onScroll!'); }}
        		style = {{height:deviceHeight}}
        		>
			<View style={{flex: 1,backgroundColor:'#071C2D',height:deviceHeight}}>
				<View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center', height:scaleSize(120),backgroundColor:'#071C2D'}}>
						<Text style = {{fontSize:setSpText(11), color:'#F3D671',}} onPress = {() => navigation.goBack()}>     返回</Text>
						<Text style = {{fontSize:setSpText(14), color:'#F3D671',}}>个人信息         </Text>
						<Text></Text>
				</View>


				<View style={{flex: 0.6,}}>
					<View style={{flex: 0.125,}}>
						<View style = {{backgroundColor:'rgb(34,52,67)',opacity:0.5}}>
							<Image
						  		style={{height:scaleSize(2)}}
						  		source={Banner_Imgs.INFORMATION_BGFORM}
							/>
						</View>
						<View style={{alignItems:'center',flexDirection:'row'}}>
							<Image
              					style={{height:scaleSize(50),width:scaleSize(50),marginLeft:scaleSize(30)}}
              					source={Banner_Imgs.INFORMATION_NICKNAMEICON} />
             			 	<TextInput  style={{marginLeft:scaleSize(30),width:scaleSize(360),fontSize:setSpText(11),color:'#F3D671'}}  
               					onChangeText={(text) => this.setState({
                      			nickname:text,
                				})} 
                				placeholder = "昵称" 
                				placeholderTextColor  = 'gray'
             					secureTextEntry  = {false}
              					underlineColorAndroid = 'transparent'
              				/>
						</View>
					</View>

					<View style={{flex: 0.125,}}>
						<View style = {{backgroundColor:'rgb(34,52,67)',opacity:0.5}}>
							<Image
						  		style={{height:scaleSize(2)}}
						  		source={Banner_Imgs.INFORMATION_BGFORM}
							/>
						</View>
						<View style={{alignItems:'center',flexDirection:'row'}}>
							<Icon name = 'edit' size = {scaleSize(50)} color = '#F3D671' style = {{marginLeft:scaleSize(30)}}/>
             			 	<TextInput  style={{marginLeft:scaleSize(30),width:scaleSize(360),fontSize:setSpText(11),color:'#F3D671'}}  
               					onChangeText={(text) => this.setState({
                      			signature:text,
                				})} 
                				placeholder = "个性签名" 
                				placeholderTextColor  = 'gray'
             					secureTextEntry  = {false}
              					underlineColorAndroid = 'transparent'
              				/>
						</View>
					</View>

					<View style={{flex: 0.125,}}>
						<View style = {{backgroundColor:'rgb(34,52,67)',opacity:0.5}}>
							<Image
						  		style={{height:scaleSize(2)}}
						  		source={Banner_Imgs.INFORMATION_BGFORM}
							/>
						</View>
						<View style={{alignItems:'center',flexDirection:'row'}}>
							<Image
              					style={{height:scaleSize(50),width:scaleSize(50),marginLeft:scaleSize(30)}}
              					source={Banner_Imgs.INFORMATION_BIRTHDAYICON} />
             			 	<TextInput  style={{marginLeft:scaleSize(30),width:scaleSize(360),fontSize:setSpText(11),color:'#F3D671'}}  
               					onChangeText={(text) => this.setState({
                      			birthday:text,
                				})} 
                				placeholder = "出生年月" 
                				placeholderTextColor  = 'gray'
             					secureTextEntry  = {false}
              					underlineColorAndroid = 'transparent'
              				/>
						</View>
					</View>
					<View style={{flex: 0.125,}}>
						<View style = {{backgroundColor:'rgb(34,52,67)',opacity:0.5}}>
							<Image
						  		style={{height:scaleSize(2)}}
						  		source={Banner_Imgs.INFORMATION_BGFORM}
							/>
						</View>
						<View style={{alignItems:'center',flexDirection:'row'}}>
							<Image
              					style={{height:scaleSize(50),width:scaleSize(50),marginLeft:scaleSize(30)}}
              					source={Banner_Imgs.INFORMATION_GENDERICON} />
             			 	<TextInput  style={{marginLeft:scaleSize(30),width:scaleSize(360),fontSize:setSpText(11),color:'#F3D671'}}  
               					onChangeText={(text) => this.setState({
                      			sex:text,
                				})} 
                				placeholder = "性别" 
                				placeholderTextColor  = 'gray'
             					secureTextEntry  = {false}
              					underlineColorAndroid = 'transparent'
              				/>
						</View>
					</View>
					<View style={{flex: 0.125,}}>
						<View style = {{backgroundColor:'rgb(34,52,67)',opacity:0.5}}>
							<Image
						  		style={{height:scaleSize(2)}}
						  		source={Banner_Imgs.INFORMATION_BGFORM}
							/>
						</View>
						<View style={{alignItems:'center',flexDirection:'row'}}>
							<Image
              					style={{height:scaleSize(50),width:scaleSize(50),marginLeft:scaleSize(30)}}
              					source={Banner_Imgs.INFORMATION_TELEPHONEICON} />
             			 	<TextInput  style={{marginLeft:scaleSize(30),width:scaleSize(360),fontSize:setSpText(11),color:'#F3D671'}}  
               					onChangeText={(text) => this.setState({
                      			telephone:text,
                				})} 
                				placeholder = "电话" 
                				placeholderTextColor  = 'gray'
             					secureTextEntry  = {false}
              					underlineColorAndroid = 'transparent'
              				/>
						</View>
					</View>
					<View style={{flex: 0.125,}}>
						<View style = {{backgroundColor:'rgb(34,52,67)',opacity:0.5}}>
							<Image
						  		style={{height:scaleSize(2)}}
						  		source={Banner_Imgs.INFORMATION_BGFORM}
							/>
						</View>
						<View style={{alignItems:'center',flexDirection:'row'}}>
							<Image
              					style={{height:scaleSize(50),width:scaleSize(50),marginLeft:scaleSize(30)}}
              					source={Banner_Imgs.INFORMATION_MAILBOXICON} />
             			 	<TextInput  style={{marginLeft:scaleSize(30),width:scaleSize(360),fontSize:setSpText(11),color:'#F3D671'}}  
               					onChangeText={(text) => this.setState({
                      			mailbox:text,
                				})} 
                				placeholder = "邮箱" 
                				placeholderTextColor  = 'gray'
             					secureTextEntry  = {false}
              					underlineColorAndroid = 'transparent'
              				/>
						</View>
					</View>

					<View style={{flex: 0.125,}}>
						<View style = {{backgroundColor:'rgb(34,52,67)',opacity:0.5}}>
							<Image
						  		style={{height:scaleSize(2)}}
						  		source={Banner_Imgs.INFORMATION_BGFORM}
							/>
						</View>
						<View style={{alignItems:'center',flexDirection:'row'}}>
							<Icon name = 'id-card' size = {scaleSize(40)} color = '#F3D671' style = {{marginLeft:scaleSize(30)}}/>
             			 	<TextInput  style={{marginLeft:scaleSize(30),width:scaleSize(360),fontSize:setSpText(11),color:'#F3D671'}}  
               					onChangeText={(text) => this.setState({
                      			iDnumber:text,
                				})} 
                				placeholder = "身份证号码" 
                				placeholderTextColor  = 'gray'
             					secureTextEntry  = {false}
              					underlineColorAndroid = 'transparent'
              				/>
						</View>
					</View>

					<View style={{flex: 0.125,}}>
						<View style = {{backgroundColor:'rgb(34,52,67)',opacity:0.5}}>
							<Image
						  		style={{height:scaleSize(2)}}
						  		source={Banner_Imgs.INFORMATION_BGFORM}
							/>
						</View>
						<View style={{alignItems:'center',flexDirection:'row'}}>
							<Icon name = 'credit-card' size = {scaleSize(40)} color = '#F3D671' style = {{marginLeft:scaleSize(30)}}/>
             			 	<TextInput  style={{marginLeft:scaleSize(30),width:scaleSize(360),fontSize:setSpText(11),color:'#F3D671'}}  
               					onChangeText={(text) => this.setState({
                      			bankCardNumber:text,
                				})} 
                				placeholder = "银行卡号" 
                				placeholderTextColor  = 'gray'
             					secureTextEntry  = {false}
              					underlineColorAndroid = 'transparent'
              				/>
						</View>
						<View style = {{backgroundColor:'rgb(34,52,67)',opacity:0.5}}>
							<Image
						  		style={{height:scaleSize(2)}}
						  		source={Banner_Imgs.INFORMATION_BGFORM}
							/>
						</View>
					</View>

				</View>
				<View style={{flex: 0.2,alignItems:'center',justifyContent:'center'}}>
					<TouchableHighlight   onPress={() => {
						if(this.state.nickname != null && this.state.nickname != '')
						{
							this.fetchData();
						}else{
							ToastShow('昵称不能为空',Constants.TOAST_SHORT);
						}
					}} underlayColor = '#071C2D'>
                		<Image  style={{height:scaleSize(100),width:scaleSize(450),}}
                  		source={Banner_Imgs.INFORMATION_SUBMITBUTTON}/>
            		</TouchableHighlight>
				</View>
			</View>
			</ScrollView>
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
		const{navigation} = this.props;
		return (
			<View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
			<View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center', height:scaleSize(120),width:deviceWidth,backgroundColor:'#071C2D'}}>
						<Text style = {{fontSize:setSpText(11), color:'#F3D671',}} onPress = {() => navigation.goBack()}>     返回</Text>
						<Text style = {{fontSize:setSpText(14), color:'#F3D671',}}>关于我们         </Text>
						<Text></Text>
				</View>
				<Image
				  style={{flex: 1,height:deviceHeight,width:deviceWidth}}
				  source={Banner_Imgs.ABOUTUS_BG}
				/>
				
			</View>
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
		const{navigation} = this.props;
		return (
			<View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
			<View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center', height:scaleSize(120),width:deviceWidth,backgroundColor:'#071C2D'}}>
						<Text style = {{fontSize:setSpText(11), color:'#F3D671',}} onPress = {() => navigation.goBack()}>     返回</Text>
						<Text style = {{fontSize:setSpText(14), color:'#F3D671',}}>关于我们         </Text>
						<Text></Text>
				</View>
				<Image
				  style={{flex: 1,height:deviceHeight,width:deviceWidth}}
				  source={Banner_Imgs.ABOUTUS_BG}
				/>
				
			</View>
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