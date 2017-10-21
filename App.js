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
} from './Public/Constants.js';
import {
	DrawerNavigatorInformationView,
	DrawerNavigatorShareView,
	DrawerAboutUsView,
} from './DrawerNavigator/DrawerNavigatorRootView.js';


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
		return(
				<View style = {{flex: 1, backgroundColor:'rgb(16,20,31)'}}>
	                <View style={{flex: 0.5,}}>
	                       <View style={{flex: 0.5,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
								<View style={{flex: 0.4,}}>
									<Image
									  style={{height:scaleSize(125),width:scaleSize(125),marginLeft:scaleSize(60)}}
									  source={Banner_Imgs.CEBIANPAGE_MYICON}
									/>
								</View>
								<View style={{flex: 0.6,}}>
									<Text style={{fontFamily:'PingFang-SC-Medium',fontSize:setSpText(15),color:'rgb(252,252,253)'}}>
									 	陈建辉
									</Text>
									<Text style={{fontFamily:'PingFang-SC-Medium',fontSize:setSpText(13),color:'rgba(252,252,253,0.63)'}}>
									  	生命不息，奋斗不止。
									</Text>
								</View>
	                       </View>
	                       <View style={{flex: 0.5,}}>
	                       		<View style={{flex: 0.3,}}>
	                       		  <TouchableHighlight onPress = {() => props.navigation.navigate('Information')}>
	                       			<Image
	                       			  style={{height:scaleSize(80),width:deviceWidth - scaleSize(200)}}
	                       			  source={Banner_Imgs.CEBIANPAGE_BACKFORM}>
	                       			  <View style = {{flex: 1,flexDirection:'row',alignItems:'center'}}>
	                       				<Image
	                       				  style={{height:scaleSize(32),width:scaleSize(32),marginLeft:scaleSize(25)}}
	                       				  source={Banner_Imgs.CEBIANPAGE_INFOMATION}
	                       				/>
	                       				<Text style={{fontFamily:'PingFang-SC-Medium',fontSize:setSpText(15),color:'rgb(252,252,253)',marginLeft:scaleSize(25)}}>
	                       				  个人信息（完善）
	                       				</Text>
	                       				</View>
	                       			</Image>
	                       			</TouchableHighlight>
	                       		</View>
	                       		<View style={{flex: 0.3,}}>
	                       			 <TouchableHighlight onPress = {() => props.navigation.navigate('Share')}>
	                       			<Image
	                       			  style={{height:scaleSize(80),width:deviceWidth - scaleSize(200)}}
	                       			  source={Banner_Imgs.CEBIANPAGE_BACKFORM}>
	                       			  <View style = {{flex: 1,flexDirection:'row',alignItems:'center'}}>
	                       				<Image
	                       				  style={{height:scaleSize(32),width:scaleSize(32),marginLeft:scaleSize(25)}}
	                       				  source={Banner_Imgs.CEBIANPAGE_SHARE}
	                       				/>
	                       				<Text style={{fontFamily:'PingFang-SC-Medium',fontSize:setSpText(15),color:'rgb(252,252,253)',marginLeft:scaleSize(25)}}>
	                       				  分享
	                       				</Text>
	                       				</View>
	                       			</Image>
	                       			</TouchableHighlight>
	                       		</View>
	                       		<View style={{flex: 0.3,}}>
	                       			 <TouchableHighlight onPress = {() => props.navigation.navigate('AboutUs')}>
	                       			<Image
	                       			  style={{height:scaleSize(80),width:deviceWidth - scaleSize(200)}}
	                       			  source={Banner_Imgs.CEBIANPAGE_BACKFORM}>
	                       			  <View style = {{flex: 1,flexDirection:'row',alignItems:'center'}}>
	                       				<Image
	                       				  style={{height:scaleSize(32),width:scaleSize(32),marginLeft:scaleSize(25)}}
	                       				  source={Banner_Imgs.CEBIANPAGE_ABOUTUS}
	                       				/>
	                       				<Text style={{fontFamily:'PingFang-SC-Medium',fontSize:setSpText(15),color:'rgb(252,252,253)',marginLeft:scaleSize(25)}}>
	                       				  关于我们
	                       				</Text>
	                       				</View>
	                       			</Image>
	                       			</TouchableHighlight>
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
		this.timer = setTimeout(() => SplashScreen.hide(), 2000);
	}

	componentWillMount() {
		this.timer && clearTimeout(this.timer);
		// Toast.show('This is a long toast.',Toast.LONG);
	}

	render() {
		return (

			<RootStackNavigator />
			
			// <ForgetPasswordView />
			//<ForgetPasswordView />
			//<RootTabNavigationBar />
			//<RootDrawerNavigator />
		);
	}
}

const styles = StyleSheet.create({

});