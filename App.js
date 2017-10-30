import React, {
	Component
} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Button,
	Alert,
	Image,
	TouchableHighlight
} from 'react-native';
import {
	StackNavigator,
	DrawerNavigator,
	TabNavigator
} from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import {
	Login,
	RegisterView,
	ForgetPasswordView
} from './Login.js';
import {
	RootTabNavigationBar,
	GuanggaoViewDetailView,
	ForeignExchangeDetailView,
	ForumViewDetail
} from './TabNavigatorRoot/TabNavigatorRoot.js';
import Toast from 'react-native-simple-toast';
import {
	scaleSize,
	setSpText,
	deviceWidth
} from './Public/ScreenAdaptationUtil.js';
import {
  RequestUrl,
  Banner_Imgs,
  Constants,
  globalVariable
} from './Public/Constants.js';
import {
	DrawerNavigatorInformationView,
	DrawerNavigatorShareView,
	DrawerAboutUsView,
} from './DrawerNavigator/DrawerNavigatorRootView.js';
import {
	renderLoadingView,
	renderErrorView,
	ToastShow
} from './Public/Utils.js';
import *as wechat from 'react-native-wechat';


const RootDrawerNavigator = DrawerNavigator({
	Home: {
		screen: RootTabNavigationBar,
	},
	Information: {
		screen: DrawerNavigatorInformationView,
	},
	Share: {
		screen: DrawerNavigatorShareView,
	},
	AboutUs: {
		screen: DrawerAboutUsView,
	},
},{
	drawerWidth:deviceWidth - scaleSize(200),
	// contentOptions:{
	// 	style:{
	// 		flex: 1,
	// 		backgroundColor:'rgb(16,20,31)',
	// 	},
	// },
	contentComponent: props =>{
		console.log('globalVariable.cookieCustomerIdyyyy:' + globalVariable.cookieCustomerId );
		return(
				<View style = {{flex: 1, backgroundColor:'rgb(16,20,31)'}}>
	                <View style={{flex: 0.5,}}>
	                       <View style={{flex: 0.5,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
								<View style={{flex: 0.4,}}>
									<Image
									  style={{height:scaleSize(150),width:scaleSize(150),marginLeft:scaleSize(40)}}
									  source={Banner_Imgs.CEBIANPAGE_MYICON}
									/>
								</View>
								<View style={{flex: 0.6,}}>
									<Text style={{fontFamily:'PingFang-SC-Medium',fontSize:setSpText(12),color:'#F3D671'}}>
									 	陈建辉
									</Text>
									<Text style={{fontFamily:'PingFang-SC-Medium',fontSize:setSpText(9),color:'rgb(252,252,253)'}}>
									  	个性签名，多投多挣
									</Text>
								</View>
	                       </View>
	                       <View style={{flex: 0.5,}}>
	                       		<View style={{flex: 0.3,}}>
	                       		  <View style = {{backgroundColor:'rgb(34,52,67)'}}>
									<Image
						  			style={{height:scaleSize(2),backgroundColor:'#0F2435'}}
						  			source={Banner_Imgs.INFORMATION_BGFORM}
									/>
								 </View>
	                       		  <TouchableHighlight onPress = {() => props.navigation.navigate('Information')} style = {{flex: 1,}}>
	                       		
	                       			  <View style = {{flex: 1,flexDirection:'row',alignItems:'center'}}>
	                       				<Image
	                       				  style={{height:scaleSize(38),width:scaleSize(38),marginLeft:scaleSize(25)}}
	                       				  source={Banner_Imgs.CEBIANPAGE_INFOMATION}
	                       				/>
	                       				<Text style={{fontFamily:'PingFang-SC-Medium',fontSize:setSpText(11),color:'#F3D671',marginLeft:scaleSize(25)}}>
	                       				  个人信息（完善）
	                       				</Text>
	                       				</View>
	                       			
	                       			</TouchableHighlight>
	                       		</View>
	                       		<View style={{flex: 0.3,}}>
	                       			<View style = {{backgroundColor:'rgb(34,52,67)'}}>
										<Image
						  				style={{height:scaleSize(2),backgroundColor:'#0F2435'}}
						  				source={Banner_Imgs.INFORMATION_BGFORM}
										/>
								 	</View>
	                       			 <TouchableHighlight onPress = {() => {
	                       			 	wechat.isWXAppInstalled()
                						.then((isInstalled) => {
                  							if (isInstalled) {
                    							ToastShow('微信已经安装!',Constants.TOAST_SHORT);
                    							WeChat.shareToTimeline({
    												type: 'imageUrl',
    												title: '聚投优品',
    												description: '聚投优品，您投资的最佳选择！',
    												mediaTagName: 'email signature',
    												messageAction: undefined,
    												messageExt: undefined,
    												imageUrl: 'http://www.jutouyp.com'
  												});

                 							}else{
                    							ToastShow('微信未安装，请安装微信！',Constants.TOAST_SHORT);
                  							}
                						});
	                       			 }} style = {{flex: 1,}}>
	                       		
	                       			  <View style = {{flex: 1,flexDirection:'row',alignItems:'center'}}>
	                       				<Image
	                       				  style={{height:scaleSize(38),width:scaleSize(38),marginLeft:scaleSize(25)}}
	                       				  source={Banner_Imgs.CEBIANPAGE_SHARE}
	                       				/>
	                       				<Text style={{fontFamily:'PingFang-SC-Medium',fontSize:setSpText(11),color:'#F3D671',marginLeft:scaleSize(25)}}>
	                       				  分享
	                       				</Text>
	                       				</View>
	                       			
	                       			</TouchableHighlight>
	                       		</View>
	                       		<View style={{flex: 0.3,}}>
	                       			 <View style = {{backgroundColor:'rgb(34,52,67)'}}>
										<Image
						  				style={{height:scaleSize(2),backgroundColor:'#0F2435'}}
						  				source={Banner_Imgs.INFORMATION_BGFORM}
										/>
								 	 </View>
	                       			 <TouchableHighlight onPress = {() => props.navigation.navigate('AboutUs')} style = {{flex: 1,}}>
	                       		
	                       			  <View style = {{flex: 1,flexDirection:'row',alignItems:'center'}}>
	                       				<Image
	                       				  style={{height:scaleSize(38),width:scaleSize(38),marginLeft:scaleSize(25)}}
	                       				  source={Banner_Imgs.CEBIANPAGE_ABOUTUS}
	                       				/>
	                       				<Text style={{fontFamily:'PingFang-SC-Medium',fontSize:setSpText(11),color:'#F3D671',marginLeft:scaleSize(25)}}>
	                       				  关于我们
	                       				</Text>
	                       				</View>
	                       			
	                       			</TouchableHighlight>
	                       			<View style = {{backgroundColor:'rgb(34,52,67)'}}>
										<Image
						  				style={{height:scaleSize(2),backgroundColor:'#0F2435'}}
						  				source={Banner_Imgs.INFORMATION_BGFORM}
										/>
								 	</View>
	                       		</View>
	                       		
	                       </View>
	                </View>
	            </View>
		)
	},
});



const RootStackNavigator = StackNavigator({
	Home: {
		screen: RootDrawerNavigator,
	},
	Login: {
		screen: Login,
	},
	RegisterView: {
		screen: RegisterView,
	},
	ForgetPasswordView: {
		screen: ForgetPasswordView,
	},
	GuanggaoViewDetailView: {
		screen: GuanggaoViewDetailView,
	},
	ForeignExchangeDetailView:{
		screen:ForeignExchangeDetailView,
	},
	ForumViewDetail:{
		screen:ForumViewDetail,
	},
	Information:{
		screen:DrawerNavigatorInformationView,
	},
	Share:{
		screen:DrawerNavigatorShareView,
	},
	AboutUs:{
		screen:DrawerAboutUsView,
	},
}, {
	navigationOptions: ({
		navigation
	}) => ({
		header:false,
		headerTitle: '首页',
		headerTitleStyle: {
			alignSelf: 'center',
		},
		// headerLeft: <Button onPress = {() => navigation.goBack()}
		// 	title = 'Back'/>
	}),

	mode: 'card',
});

export default class App extends Component {

	componentDidMount() {
		 try {
				wechat.registerApp('wxe20b89f7bd45d7f4');
			}catch(e){
				 console.error('eeeeeeeeeeeee:' + e);
			}
		 console.log('wechat:' + wechat);
		this.timer = setTimeout(() => SplashScreen.hide(), 2000);
	}

	componentWillMount() {
		this.timer && clearTimeout(this.timer);
		// Toast.show('This is a long toast.',Toast.LONG);
	}

	render() {
		return (

			<RootStackNavigator />

			// <Login />
			// <ForgetPasswordView />
			//<ForgetPasswordView />
			//<RootTabNavigationBar />
			//<RootDrawerNavigator />
		);
	}
}

const styles = StyleSheet.create({

});