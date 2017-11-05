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
import PopupDialog,{
	DialogTitle,
	SlideAnimation  
} from 'react-native-popup-dialog';

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

class PopupDialogClass extends Component{
	constructor(props) {
	  super(props);
	  
	  this.state = {
	  		integrals:'',
	  		inputintegral:'7 MT4积分',
	  		
	  };
	}

	componentWillMount() {
		Cookie.get(RequestUrl.LOGIN_URL, 'integral').then((cookie) => {
			this.setState({
				integrals:cookie,
			});
		});
		console.log('componentWillMount');
	}

	// componentDidMount() {
	// 	console.log('componentDidMount');
	// 	console.log('this.props.platform:' + this.props.platform);
	// }

	componentWillReceiveProps(nextProps) {
		console.log('componentWillReceiveProps');
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	console.log('shouldComponentUpdates');
	// }

	fetchIntegralData(){
		
			var ids = Cookie.get(RequestUrl.LOGIN_URL, 'customerId').then((cookie) => console.log(cookie));
			Cookie.get(RequestUrl.LOGIN_URL, 'customerId').then((cookie) => console.log(cookie));
			console.log('ids:' + ids);


		Cookie.get(RequestUrl.LOGIN_URL, 'customerId').then((cookie) => {
				fetch(RequestUrl.INTEGRAL_URL, {
          				method: 'POST',
          				headers: {
            				'Content-Type': 'application/x-www-form-urlencoded',
         				 },
         				body: 'customerId=' + cookie + '&' + 'amount=' + this.state.inputintegral + '&' + 'type=' + this.state.platform
       				 })
      				.then((response) => response.json())
      				.then((responseJson) => {
        			// this.setState({
        			//   isLoading: false,
        			// });
        			console.log(responseJson);
        			if (responseJson.success) {
          			// navigate('Login');
          					this.setState({
          						integrals:this.state.integrals - this.state.inputintegral,
          					});
          					 Cookie.set(RequestUrl.LOGIN_URL, 'integral',this.state.integrals).then(() => console.log('integral'));
          					ToastShow('积分转入成功！',Constants.TOAST_SHORT);
        			} else {
          					ToastShow('积分转入失败！',Constants.TOAST_SHORT);
        				}
      				})
      				.catch((error) => {
        				// ToastShow(error,Constants.TOAST_SHORT);
        				console.error(error);
        				Alert.alert(error);
        				this.setState({
          				error: true,
          				errorInfo: error,
        		});
      		});
		});
	}

	render(){
		
		return(
			
			<View style = {{flex: 1, backgroundColor:'#071C2D'}}>
      					<View style={{flex: 0.1,}}>
      						<Text style={{fontSize:setSpText(13),color:'rgb(248,231,162)',textAlignVertical:'center',marginTop:scaleSize(20),marginLeft:scaleSize(50),alignItems:'center'}}>
      					  		积分转入比例:(聚投/MT4)1:7
							</Text>
      					</View>
      					<View style={{flex: 0.6,marginTop:scaleSize(40)}}>
      						<Text style={{fontSize:setSpText(10),color:'rgb(248,231,162)',marginLeft:scaleSize(50),textAlignVertical:'center',marginTop:scaleSize(20)}}>账户积分:    {this.state.integrals}</Text>
      						
      						<View style={{flex: 0.4,flexDirection:'row',alignItems:'center',marginTop:scaleSize(40)}}>
      							<Text style={{fontSize:setSpText(10),color:'rgb(248,231,162)',marginLeft:scaleSize(50),textAlignVertical:'center',}}>转入积分:</Text>
      							<TextInput  style={{height:scaleSize(70),width:scaleSize(150),fontSize:setSpText(8),color:'#F3D671',borderColor: 'gray', borderWidth: 1,borderRadius:4}}  
               						onChangeText={(text) => {
               							this.setState({
               								inputintegral:text,
               							});
               						}}
                					placeholder = "聚投优品积分 1" 
                					placeholderTextColor  = '#F3D671'
              						secureTextEntry  = {false}
              						underlineColorAndroid = 'transparent'
              						keyboardType = 'numeric'
              					/>
              					<Text style = {{marginLeft:scaleSize(25),fontSize:setSpText(20),color:'#F3D671',textAlignVertical:'center',textAlign:'center'}}>
              						:
              					</Text>
              					<Text style = {{height:scaleSize(70),width:scaleSize(150),borderColor: 'gray', borderWidth: 1,borderRadius:4,fontSize:setSpText(8),color:'#F3D671',marginLeft:scaleSize(40),textAlignVertical:'center',textAlign:'center'}}>
              					{this.state.inputintegral * 7} 
              					</Text>

      						</View>
      					</View>
      					<View style = {{flex: 0.4,}}>
							<TouchableHighlight onPress={() => {
								if (this.state.integrals != null && this.state.integrals != '' && this.state.integrals >= 0) {
									// this.props.popupDialog.dismiss();
									this.fetchIntegralData();
								}else
								{
									ToastShow('转入积分不能小于0！',Constants.TOAST_SHORT);
								}
							}}
								style = {{alignItems:'center',flex:1}} >
              				 	<Image
              				 		style={{height:(deviceHeight/2 - 100)/5,width:deviceWidth - 150,}}
              				  		source={Banner_Imgs.POPPAGE_CONFIRMINTEGRALTURNBUTTON}
              					/>
              				</TouchableHighlight>
      					</View>
    				</View>
    				
			);
	}
}

class DrawerIntegralManagement extends Component{
	constructor(props) {
	  super(props);
	  this.platform = '';
	  this.state = {
	  	// platform:'',
	  };
	}

	render(){
		const{navigation} = this.props;
		var _scrollView: ScrollView;
		return(
			<View style={{flex: 1,backgroundColor:'#071C2D',height:deviceHeight}}>
				
					<PopupDialog  dialogTitle={<DialogTitle title="积分转入" titleStyle = {{backgroundColor:'#F3D671',}} titleTextStyle = {{fontSize:setSpText(14),color:'black',textAlignVertical:'center'}}/>}
    				ref={(popupDialog) => { this.popupDialog = popupDialog; }}
    				 dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' }) }
					 width = {deviceWidth - 80}
					 height = {deviceHeight/2-50}
					 overlayOpacity = {0.8}
    				 >
    					<PopupDialogClass platform= {this.platform}/>
 			    	</PopupDialog>

				<View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center', height:scaleSize(120),backgroundColor:'#071C2D'}}>
						<Text style = {{fontSize:setSpText(11), color:'#F3D671',}} onPress = {() => navigation.goBack()}>     返回</Text>
						<Text style = {{fontSize:setSpText(14), color:'#F3D671',}}>积分管理         </Text>
						<Text></Text>
				</View>

				<ScrollView
        		ref={(scrollView) => { _scrollView = scrollView; }}
        		automaticallyAdjustContentInsets={true}
        		onScroll={() => { console.log('onScroll!'); }}
        		style = {{flex: 1,}}
        		>

				<View style={{flex: 0.4,}}>

				<TouchableHighlight style={{flex: 0.2,}} onPress = {() => {
					this.popupDialog.show();
					this.platform = 1;
				}}>
					<View style={{flex: 1,}}>
						<View style = {{backgroundColor:'rgb(34,52,67)',opacity:0.5}}>
							<Image
						  		style={{height:scaleSize(2)}}
						  		source={Banner_Imgs.INFORMATION_BGFORM}
							/>
						</View>
						<View style={{flexDirection:'row',}}>
							<Image
              					style={{height:scaleSize(50),width:scaleSize(50),marginLeft:scaleSize(30),marginTop:scaleSize(20)}}
              					source={Banner_Imgs.INFORMATION_NICKNAMEICON} />
             			 	<Text style = {{marginLeft:scaleSize(50),fontSize:setSpText(11),color:'#F3D671',marginTop:scaleSize(30)}}>
             			 		平台一
             			 	</Text>
             			 	<Icon name = 'angle-right' size = {scaleSize(50)} color = '#F3D671' style = {{marginLeft:(deviceWidth - scaleSize(280)),marginTop:scaleSize(20)}}/>
						</View>
					</View>
					</TouchableHighlight>


					<TouchableHighlight style={{flex: 0.2,}} onPress = {() => {
						this.popupDialog.show();
					}}>
					<View style={{flex: 1,}}>
						<View style = {{backgroundColor:'rgb(34,52,67)',opacity:0.5}}>
							<Image
						  		style={{height:scaleSize(2)}}
						  		source={Banner_Imgs.INFORMATION_BGFORM}
							/>
						</View>
						<View style={{alignItems:'center',flexDirection:'row'}}>
							<Icon name = 'edit' size = {scaleSize(50)} color = '#F3D671' style = {{marginLeft:scaleSize(30),marginTop:scaleSize(20)}}/>
             			 	<Text style = {{marginLeft:scaleSize(50),fontSize:setSpText(11),color:'#F3D671',marginTop:scaleSize(30)}}>
             			 		平台二
             			 	</Text>
             			 	<Icon name = 'angle-right' size = {scaleSize(50)} color = '#F3D671' style = {{marginLeft:(deviceWidth - scaleSize(280)),marginTop:scaleSize(20)}}/>
						</View>
					</View>
					</TouchableHighlight>

					<TouchableHighlight style={{flex: 0.2,}} onPress = {() => {
						this.popupDialog.show();
					}}>
					<View style={{flex: 1,}}>
						<View style = {{backgroundColor:'rgb(34,52,67)',opacity:0.5}}>
							<Image
						  		style={{height:scaleSize(2)}}
						  		source={Banner_Imgs.INFORMATION_BGFORM}
							/>
						</View>
						<View style={{alignItems:'center',flexDirection:'row'}}>
							<Image
              					style={{height:scaleSize(50),width:scaleSize(50),marginLeft:scaleSize(30),marginTop:scaleSize(20)}}
              					source={Banner_Imgs.INFORMATION_BIRTHDAYICON} />
             			 	<Text style = {{marginLeft:scaleSize(50),fontSize:setSpText(11),color:'#F3D671',marginTop:scaleSize(30)}}>
             			 		平台三
             			 	</Text>
             			 	<Icon name = 'angle-right' size = {scaleSize(50)} color = '#F3D671' style = {{marginLeft:(deviceWidth - scaleSize(280)),marginTop:scaleSize(20)}}/>
						</View>
					</View>
					</TouchableHighlight>

					<TouchableHighlight style={{flex: 0.2,}} onPress = {() => {
						this.popupDialog.show();
					}}>
					<View style={{flex: 1,}}>
						<View style = {{backgroundColor:'rgb(34,52,67)',opacity:0.5}}>
							<Image
						  		style={{height:scaleSize(2)}}
						  		source={Banner_Imgs.INFORMATION_BGFORM}
							/>
						</View>
						<View style={{alignItems:'center',flexDirection:'row'}}>
							<Image
              					style={{height:scaleSize(50),width:scaleSize(50),marginLeft:scaleSize(30),marginTop:scaleSize(20)}}
              					source={Banner_Imgs.INFORMATION_GENDERICON} />
             			 	<Text style = {{marginLeft:scaleSize(50),fontSize:setSpText(11),color:'#F3D671',marginTop:scaleSize(30)}}>
             			 		平台四
             			 	</Text>
             			 	<Icon name = 'angle-right' size = {scaleSize(50)} color = '#F3D671' style = {{marginLeft:(deviceWidth - scaleSize(280)),marginTop:scaleSize(20)}}/>
						</View>
					</View>
					</TouchableHighlight>

					<TouchableHighlight style={{flex: 0.2,}} onPress = {() => {
						this.popupDialog.show();
					}}>
					<View style={{flex: 1,}}>
						<View style = {{backgroundColor:'rgb(34,52,67)',opacity:0.5}}>
							<Image
						  		style={{height:scaleSize(2)}}
						  		source={Banner_Imgs.INFORMATION_BGFORM}
							/>
						</View>
						<View style={{alignItems:'center',flexDirection:'row'}}>
							<Image
              					style={{height:scaleSize(50),width:scaleSize(50),marginLeft:scaleSize(30),marginTop:scaleSize(20)}}
              					source={Banner_Imgs.INFORMATION_TELEPHONEICON} />
             			 	<Text style = {{marginLeft:scaleSize(50),fontSize:setSpText(11),color:'#F3D671',marginTop:scaleSize(30)}}>
             			 		积分互转
             			 	</Text>
             			 	<Icon name = 'angle-right' size = {scaleSize(50)} color = '#F3D671' style = {{marginLeft:(deviceWidth - scaleSize(305)),marginTop:scaleSize(20)}}/>
						</View>
						
					</View>
					</TouchableHighlight>
					<View style = {{backgroundColor:'rgb(34,52,67)',opacity:0.5}}>
							<Image
						  		style={{height:scaleSize(2),marginTop:scaleSize(0)}}
						  		source={Banner_Imgs.INFORMATION_BGFORM}
							/>
						</View>
					
					
				</View>
				</ScrollView>
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
	DrawerIntegralManagement,
};