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
	FlatList,
	Image,
	TouchableHighlight,
	ProgressBarAndroid,
	TextInput
} from 'react-native';
import {
	TabNavigator
} from 'react-navigation';

import {
	RequestUrl,
	Banner_Imgs,
	Constants,
	globalVariable
} from '../Public/Constants.js';

import {
	renderLoadingView,
	renderErrorView,
	ToastShow
} from '../Public/Utils.js';
import {
	scaleSize,
	setSpText,
	deviceWidth,
	deviceHeight
} from '../Public/ScreenAdaptationUtil.js';
import Swiper from 'react-native-swiper-animated';
import PopupDialog,{
	DialogTitle,
	SlideAnimation  
} from 'react-native-popup-dialog';
import Cookie from 'react-native-cookie';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewPager from 'react-native-viewpager'; 



var ITEM_HEIGHT = 400;
var cookieCustomerId = '';

var jifen = '';

const BANNER_IMGS = [  
    Banner_Imgs.MAINPAGEVIEW_BANNER,  
    Banner_Imgs.MAINPAGEVIEW_BANNERONE,  
    Banner_Imgs.MAINPAGEVIEW_BANNERTWO,    
];

class ConsultationView extends Component {

	_flatList;

	_keyExtractor = (item, index) => index;

	static navigationOptions = ({
		navigation
	}) => ({
		// headerLeft: < Text onPress = {
		// 		() => {
		// 			navigation.navigate('DrawerOpen');
		// 		}
		// 	} >
		// 	More < /Text>,
		// header: false,
		tabBarLabel: '首页',
		tabBarIcon: ({
			tintColor
		}) => (
			<Image
			  style={[styles.icon, {tintColor: tintColor}]}
			  resizeMode='center'  
			  source={Banner_Imgs.MAINPAGEVIEW_HOMEICON}
			/>
		),
	});

	constructor(props) {
		super(props);
		this.integral = 0;
		this.platform = 0;
		var dataSource = new ViewPager.DataSource({  
            pageHasChanged: (p1, p2) => p1 !== p2,  
        });  
		this.state = {
			data: [],
			isLoading: true,
			error: false,
			errorInfo: "",
			integrals:'',
			dataSource:dataSource.cloneWithPages(BANNER_IMGS), 
		};

		
		
	}

	componentDidMount() {
		Cookie.get(RequestUrl.LOGIN_URL, 'customerId').then((cookie) => {
			globalVariable.cookieCustomerId = cookie;
			this.fetchData();
		});	
		Cookie.get(RequestUrl.LOGIN_URL, 'customerName').then((cookie) => {
			// console.log('customerName:' + cookie);
			globalVariable.nickName = cookie;
			
		});

		Cookie.get(RequestUrl.LOGIN_URL, 'autograph').then((cookie) => {
			// console.log('autograph:' + cookie);
			globalVariable.signature = cookie;
		});		
	}



	fetchData() {
		console.log('globalVariable.cookieCustomerIdpppp:' + globalVariable.cookieCustomerId );
		fetch(RequestUrl.MAINPAGEVIEW_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'customerId=' + globalVariable.cookieCustomerId
        })
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({
					data: responseData.index,
					integrals:responseData.integral,
					isLoading: false,
				});
				 Cookie.set(RequestUrl.LOGIN_URL, 'integral',this.state.integrals).then(() => console.log('integral'));
				// jifen = this.state.integrals;
				ToastShow('获取数据成功',Constants.TOAST_SHORT);
			})
			.catch((error) => {
				this.setState({
					error: true,
					errorInfo: error,
				});
			})
			.done();
	}

	_renderPage(data, pageID) {  
        return (  
            <Image  
                source={data}  
                style={styles.page}/>  
        );  
    } 

	_header = () => {
		const {
			navigation
		} = this.props;
		
		return (
			<View style = {{height:scaleSize(420)}}>
					<View style = {{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', height:scaleSize(120),backgroundColor:'#071C2D'}}>
						<TouchableHighlight onPress = {() => {
						navigation.navigate('DrawerOpen',{name:'chenjianhui'});
						}}>
							<Image
					  			style={{width:scaleSize(58),height:scaleSize(58),marginLeft:scaleSize(15)}}
					  			source={Banner_Imgs.MAINPAGEVIEW_TOPICON}
								/>
						</TouchableHighlight>
						<Text style = {{fontFamily:'PingFang-SC-Light',fontSize:setSpText(18), color:'rgb(243,214,113)',marginLeft:scaleSize(20)}}>
							{this.state.integrals}
						</Text>
						<Text style = {{fontFamily:'PingFang-SC-Light',fontSize:setSpText(10), color:'rgb(255,255,255)',marginLeft:scaleSize(20),marginTop:scaleSize(20)}}>
						   积分
						</Text>
					</View>


						<View style={styles.container}>  
                  			<ViewPager  
                    		style={{height:300}}  
                    		dataSource={this.state.dataSource}  
                    		renderPage={this._renderPage}  
                    		isLoop={true}  
                    		autoPlay={true}/>  
            			</View>  
					
	

					<View style={{height:scaleSize(25),backgroundColor:'#071C2D'}}/>

					
			</View>
		);
	}


	fetchIntegralData(){
		
			var ids = Cookie.get(RequestUrl.LOGIN_URL, 'customerId').then((cookie) => console.log(cookie));
			// Cookie.get(RequestUrl.LOGIN_URL, 'customerId').then((cookie) => ids = cookie);
			Cookie.get(RequestUrl.LOGIN_URL, 'customerId').then((cookie) => console.log(cookie));
			console.log('ids:' + ids);
			console.log('this.integral:' + this.integral);
			console.log('this.platform:' + this.platform);


		Cookie.get(RequestUrl.LOGIN_URL, 'customerId').then((cookie) => {
				fetch(RequestUrl.INTEGRAL_URL, {
          				method: 'POST',
          				headers: {
            				'Content-Type': 'application/x-www-form-urlencoded',
         				 },
         				body: 'customerId=' + cookie + '&' + 'amount=' + this.integral + '&' + 'type=' + this.platform
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
          						integrals:this.state.integrals - this.integral,
          					});
          					jifen = this.state.integrals;
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

	//加载页面上数据
	renderData() {

		return (

			<View style={{flex: 1, backgroundColor:'#071C2D'}}>

			

				<FlatList 
						 ref={(flatList)=>this._flatList = flatList}
						  ListHeaderComponent={this._header}			
						 ItemSeparatorComponent={this._separator}
						 getItemLayout={(item, index) => ( {length: ITEM_HEIGHT, offset: (ITEM_HEIGHT + scaleSize(30)) * index, index} )}
						 renderItem={this._renderItem}
						 keyExtractor={this._keyExtractor}
						  ListEmptyComponent={this._createEmptyView()}
						 data = {this.state.data}
						/>
		</View>
		);
	}

	_renderItem = (item) => {

		switch (item.item.type) {
			case '0':
				return (this.listStyleZero(item));
				break;
			case '1':
			case '2':
				return (this.listStyleOne(item));

				// return(this.listStyleTwo(item));
				break;
			case '3':
				return (this.listStyleThird(item));
				break;
			default:
				return (this.listStyleDefault(item));
		}
	}


	//listView样式1
	listStyleZero(item) {
		console.log("item.item.type:" + item.item.type);
		const {
			navigate
		} = this.props.navigation;
		return (
			<View style={{height:scaleSize(500),backgroundColor:'#0F2435'}}>
				<View style={{flex: 0.15, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style = {{fontSize:setSpText(11),color:'#F3D671',marginLeft:scaleSize(20),marginTop:scaleSize(20)}}>{item.item.title}</Text>
					<Text style = {{fontSize:setSpText(8),color:'#F3D671',marginRight:scaleSize(20),marginTop:scaleSize(20)}}>{item.item.createDate}</Text>
				</View>
				<View style={{flex: 0.65,}}>
					<View style={{height:scaleSize(20)}}>
					</View>
					<Image style = {{height:scaleSize(280),width:deviceWidth,resizeMode:'cover'}}
				  		source={Banner_Imgs.MAINPAGETIEBABACK}>

						<Text style = {{flex: 0.6, textAlign:'center',textAlignVertical:'bottom'}}>{item.item.content}</Text>
						<View style={{flex:0.3,flexDirection:'row'}}>
							<Text style = {{flex: 0.5, textAlign:'right',textAlignVertical:'center'}}>晒贴人:{item.item.createrName}</Text>
							<Text style = {{flex: 0.5, textAlign:'left',textAlignVertical:'center'}}>|跟帖数:{item.item.count}</Text>
						</View>
					</Image>
					<View style={{height:scaleSize(20)}}>
					</View>
				</View>
				<View style={{flex: 0.2,}}>
					<Image
				  		style={{height:scaleSize(2),width:deviceWidth,opacity:0.6}}
				  		source={Banner_Imgs.GUANGGAOPAGE_FENGEFU}
					/>
					<TouchableHighlight style = {{flex: 1,}} onPress = {() => navigate('ForumViewDetail',{item:item.item})}>
						<Text style = {{flex:1,textAlign:'center',textAlignVertical:'center',fontSize:setSpText(11),color:'#F3D671'}}>
							参与评论
						</Text>
					</TouchableHighlight>
				</View>
			</View>
		);
	}

	listStyleOne(item) {
		console.log("item.item.type:" + item.item.type);
		const {
			navigate
		} = this.props.navigation;
		return (
			<View style={{height:scaleSize(500),backgroundColor:'#0F2435'}}>
				<View style={{flex: 0.15, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style = {{fontSize:setSpText(11),color:'#F3D671',marginLeft:scaleSize(20),marginTop:scaleSize(20)}}>{item.item.title}</Text>
					<Text style = {{fontSize:setSpText(8),color:'#F3D671',marginRight:scaleSize(20),marginTop:scaleSize(20)}}>{item.item.createDate}</Text>
				</View>
				<View style={{flex: 0.65,}}>
					<View style={{height:scaleSize(20)}}>
					</View>
						<Image
				  			style = {{height:scaleSize(280),width:deviceWidth,resizeMode:'cover'}}
				  			source={{uri:item.item.indexImg}}
						/>
					<View style={{height:scaleSize(20)}}>
					</View>
				</View>
				<View style={{flex: 0.2,}}>
					<Image
				  		style={{height:scaleSize(2),width:deviceWidth,opacity:0.6}}
				  		source={Banner_Imgs.GUANGGAOPAGE_FENGEFU}
					/>
					<TouchableHighlight style = {{flex: 1,}} onPress = {() => navigate('GuanggaoViewDetailView',{item:item.item})}>
						<Text style = {{flex:1,textAlign:'center',textAlignVertical:'center',fontSize:setSpText(11),color:'#F3D671'}}>
							立即领取
						</Text>
					</TouchableHighlight>
				</View>
			</View>
		);
	}

	listStyleTwo(item) {
		console.log("item.item.type:" + item.item.type);
		return (<Text>chenjianhui</Text>);
	}
	listStyleThird(item) {
		console.log("item.item.type:" + item.item.type);
		return (<Text>chenjianhui</Text>);
	}
	listStyleDefault(item) {
		console.log("item.item.type:" + item.item.type);
		return (<Text>chenjianhui</Text>);
	}

	//LISTVIEW行分隔符
	_separator = () => {
		return <View style={{height:scaleSize(20),backgroundColor:'#071C2D'}}/>;
	}


	_createEmptyView() {
		return (
			<Text style={{fontSize: setSpText(40), alignSelf: 'center'}}>还没有数据哦！</Text>
		);
	}

	render() {
		console.log("_keyExtractor:" + this._keyExtractor);
		const {
			navigate
		} = this.props.navigation;

		if (this.state.isLoading && !this.state.error) {
			return renderLoadingView();

		} else if (this.state.error) {
			return renderErrorView(this.state.errorInfo);
		}

		return this.renderData();


	}
}

//外汇页面
class ForeignExchangeView extends Component {

	_flatList;

	_keyExtractor = (item, index) => index;

	static navigationOptions = {
		header:false,
		tabBarLabel: "外汇",
		tabBarIcon: ({
			tintColor
		}) => (
			<Image
			  style={[styles.icon, {tintColor: tintColor}]}
			  resizeMode='center'  
			  source={Banner_Imgs.MAINPAGEVIEW_WAIHUIICON}
			/>

		),

	};

	constructor(props) {
		super(props);

		this.state = {
			data: [{key:'1'},{key:'2'},{key:'3'},{key:'4'}],
		};
	}

	_header = () =>{
		return(
			<View style = {{flexDirection:'row', justifyContent:'center', alignItems:'center', height:scaleSize(120),backgroundColor:'#071C2D'}}>
						<Text style = {{fontSize:setSpText(14), color:'#F3D671',fontFamily:'PingFang-SC-Light',}}>外汇</Text>
					</View>
		);
	}

	_separator = () =>{
		return <View style={{height:scaleSize(20),backgroundColor:'#071C2D'}}/>;
	}

	_renderItem = (item) =>{
		console.log('item.item.key:' + item.item.key);
		var picUrl = '';
		switch(item.item.key){
				case '1':
					picUrl = Banner_Imgs.WAIHUIPAGE_WAIHUI001;
					break;
				case '2':
					picUrl = Banner_Imgs.WAIHUIPAGE_WAIHUI002;
					break;
				case '3':
					picUrl = Banner_Imgs.WAIHUIPAGE_WAIHUI003;
					break;
				case '4':
					picUrl = Banner_Imgs.WAIHUIPAGE_WAIHUI004;
					break;
				default:
				picUrl = Banner_Imgs.WAIHUIPAGE_WAIHUI001;
			}
			const {navigate} = this.props.navigation;
		return(
			<TouchableHighlight style = {{flex: 1,justifyContent:'center',alignItems:'center'}} onPress = {() => navigate('ForeignExchangeDetailView',{key:item.item.key})}>
				<Image source = {picUrl} 
				style = {{height:scaleSize(250), width:deviceWidth-20, resizeMode:'cover',}}/>
			</TouchableHighlight>
		);
	}
	_createEmptyView(){
		return (
			<Text style={{fontSize: scaleSize(40), alignSelf: 'center'}}>还没有数据哦！</Text>
		);
	}

	render() {
		return (
			<View style={{flex: 1, backgroundColor:'#071C2D'}}>
				<FlatList 
						 ref={(flatList)=>this._flatList = flatList}
						  ListHeaderComponent={this._header}			
						 ItemSeparatorComponent={this._separator}
						 getItemLayout={(item, index) => ( {length: ITEM_HEIGHT, offset: (ITEM_HEIGHT + scaleSize(30)) * index, index} )}
						 renderItem={this._renderItem}
						 keyExtractor={this._keyExtractor}
						  ListEmptyComponent={this._createEmptyView()}
						 data = {this.state.data}
						/>
		</View>
		);
	}
}

//积分增值页面
class IntegralIncrementView extends Component {

	_flatList;

	_keyExtractor = (item, index) => index;

	static navigationOptions = {
		header:false,
		tabBarLabel: "积分增值",
		tabBarIcon: ({
			tintColor
		}) => (
			<Image
			  style={[styles.icon, {tintColor: tintColor}]}
			  resizeMode='center'  
			  source={Banner_Imgs.MAINPAGEVIEW_ZENGZHIICON}
			/>

		),
	};
	
	constructor(props) {
		super(props);
		this.integral = '';
		this.state = {
			data: [{key:'1'},{key:'2'},{key:'3'},{key:'4'}],
			isLoading: false,
			error: false,
			errorInfo: "",
			progress:0.1,
			newOrOld:true,
			change:true,
			integrals:'',
			platform:'',
			cookieID:'',
		};
	}

	componentDidMount() {
		// this.setInterval(
  //     		() => {
  //       	var progress = (this.state.progress + 0.02) % 1;
  //      	 	this.setState({progress: progress});
  //     	}, 50
  //   	);
	}

	componentWillMount() {
		Cookie.get(RequestUrl.LOGIN_URL, 'integral').then((cookie) => {
			this.setState({
				integrals:cookie,
			});
		});

		Cookie.get(RequestUrl.LOGIN_URL, 'integral').then((cookie) => {
			this.setState({
				cookieID:cookie,
			});
			this.fetchData();
		});
		console.log('componentWillMount');
	}

	fetchData() {
		
		fetch(RequestUrl.JIFENZENGZHIPAGE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'customerId=' + this.state.cookieID + '&' + 'type=' + (this.state.newOrOld?1:2)
        })
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.success) {
					this.setState({
						data: responseData.message,
						isLoading: false,
					});
					ToastShow('获取数据成功',Constants.TOAST_SHORT);
				}else{
					ToastShow('获取数据失败',Constants.TOAST_SHORT);
				}

				
			})
			.catch((error) => {
				this.setState({
					error: true,
					errorInfo: error,
				});
			})
			.done();
	}

	

	_header = () =>{
		return(
		<View style = {{height:scaleSize(280),backgroundColor:'#071C2D'}}>
			<View style = {{flexDirection:'row', justifyContent:'center', alignItems:'center', height:scaleSize(120),backgroundColor:'#071C2D'}}>
						<Text style = {{fontSize:setSpText(14), color:'#F3D671',fontFamily:'PingFang-SC-Light'}}>积分增值</Text>
			</View>

			<View style = {{height:scaleSize(70),backgroundColor:'#071C2D'}}>
					<TouchableHighlight style = {{flex: 1,alignItems:'center',}} onPress = {() => this.setState({
								newOrOld:this.state.newOrOld?false:true,
							})} underlayColor = '#071C2D'>

								<Image
								  style={{height:scaleSize(60),width:scaleSize(370),resizeMode:'cover',marginTop:scaleSize(5)}}
								  source={this.state.newOrOld?Banner_Imgs.XINSHOUPAGE_BUTTON:Banner_Imgs.DINGQIPAGE_BUTTON}
								/>
								
							</TouchableHighlight>
				</View>

			
			<View style={{height:scaleSize(20)}}>
			</View>
			<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:scaleSize(90),backgroundColor:'#0F2435',}}>
				<Text style = {{fontSize:setSpText(12),color:'#F3D671',}}>
					{this.state.newOrOld?'     新手投资':'     定期投资'}
				</Text>
				<Text style = {{fontSize:setSpText(12),color:'#F3D671'}}>
					{this.state.newOrOld?'':'已成功1000期     '}
				</Text>
			</View>
		</View>
		);
	}

	_separator = () =>{
		return <View style={{height:scaleSize(18),backgroundColor:'#071C2D'}}/>;
	}

	_createEmptyView(){
		return (
			<Text style={{fontSize: setSpText(40), alignSelf: 'center'}}>还没有数据哦！</Text>
		);
	}

	_renderItem = (item) =>{
		if (this.state.newOrOld) {
			//新手投资
			return(
				<TouchableHighlight style = {{flex: 1,}} onPress = {() => {
					this.popupDialog.show();
				}}>
					<View style={{height:scaleSize(200), backgroundColor:'#0F2435',}}>	
						<View style={{height:scaleSize(35)}}>
						</View>
						<View style={{flex: 0.4,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
							<Text style = {{fontSize:setSpText(20),color:'red'}}>8.0%</Text>
							<Text style = {{fontSize:setSpText(11),color:'#F3D671'}}>    {item.item.totalDayd}</Text>
							<Text style = {{fontSize:setSpText(11),color:'#F3D671'}}>已投56人</Text>
						</View>
						<View style={{flex: 0.3,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
							<Text style = {{fontSize:setSpText(9),color:'#808080'}}>历史参考收益</Text>
							<Text style = {{fontSize:setSpText(9),color:'#808080'}}>投资期限</Text>
							<Text style = {{fontSize:setSpText(9),color:'#808080'}}>融资300.00万</Text>
						</View>
						<View style={{flex: 0.3,}}>
						</View>
					</View>
				</TouchableHighlight>
			);
		}else
		{
			//定期投资
			return(
			<TouchableHighlight style = {{flex: 1,}} onPress = {() => {
				this.popupDialog.show();
			}}>
				<View style={{height:scaleSize(200), backgroundColor:'#0F2435'}}>
					<View style={{height:scaleSize(20)}}>
					</View>
					<View style={{flex: 0.4,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
						<Text style = {{fontSize:setSpText(20),color:'red'}}>8.0%</Text>
						<Text style = {{fontSize:setSpText(11),color:'#F3D671'}}>        {item.item.totalDayd}</Text>
						<Text style = {{fontSize:setSpText(11),color:'#F3D671'}}>已投56人</Text>
					</View>
					<View style={{flex: 0.3,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
						<Text style = {{fontSize:setSpText(9),color:'#808080'}}>历史参考收益</Text>
						<Text style = {{fontSize:setSpText(9),color:'#808080'}}>投资期限</Text>
						<Text style = {{fontSize:setSpText(9),color:'#808080'}}>融资300.00万</Text>
					</View>
					<View style={{flex: 0.3,justifyContent:'center',alignItems:'center',}}>
						<ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress = {item.item.yield/item.item.totaAmount} color = '#F3D671' style = {{height:scaleSize(30),width:deviceWidth-40}}/>
					</View>
				</View>
			</TouchableHighlight>
			);
		}
		
	}

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
         				body: 'customerId=' + cookie + '&' + 'amount=' + this.integral + '&' + 'type=' + this.state.platform
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
          						integrals:this.state.integrals - this.integral,
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

	renderData(){
		return(
			<View style={{flex: 1, backgroundColor:'#071C2D'}}>

			<PopupDialog  dialogTitle={<DialogTitle title="积分转入" titleStyle = {{backgroundColor:'#F3D671',}} titleTextStyle = {{fontSize:setSpText(14),color:'black',textAlignVertical:'center'}}/>}
    				ref={(popupDialog) => { this.popupDialog = popupDialog; }}
    				 dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' }) }
					 width = {deviceWidth - 80}
					 height = {deviceHeight/2-50}
					 overlayOpacity = {0.8}
    				 >
    				<View style = {{flex: 1, backgroundColor:'#071C2D'}}>
      					
      					<View style={{flex: 0.5,marginTop:scaleSize(40)}}>
      						<Text style={{fontSize:setSpText(10),color:'rgb(248,231,162)',marginLeft:scaleSize(50),textAlignVertical:'center'}}>账户积分:    {this.state.integrals}</Text>
      						
      						<View style={{flex: 0.5,flexDirection:'row',alignItems:'center',marginTop:scaleSize(40)}}>
      						<Text style={{fontSize:setSpText(10),color:'rgb(248,231,162)',marginLeft:scaleSize(50),textAlignVertical:'center',}}>转入积分:    </Text>
      						<TextInput  style={{height:scaleSize(80),width:scaleSize(300),fontSize:setSpText(11),color:'#F3D671',borderColor: 'gray', borderWidth: 1,borderRadius:4}}  
               					onChangeText={(text) =>this.integral = text}
                				placeholder = "请输入转入的积分" 
                				placeholderTextColor  = 'gray'
              					secureTextEntry  = {false}
              					underlineColorAndroid = 'transparent'
              					keyboardType = 'numeric'
              				/>
      						</View>
      					</View>
      					
      					<View style = {{flex: 0.3,alignItems:'center'}}>
							<TouchableHighlight onPress={() => {
								if (this.integral != null && this.integral != '') {
									console.log('this.integralssswwww:' + this.integral);
									this.popupDialog.dismiss();
									this.fetchIntegralData();
								}else
								{
									ToastShow('转入积分不能小于0！',Constants.TOAST_SHORT);
								}
							}}>
              				 	<Image
              				 		style={{height:(deviceHeight/2 - 100)/5,width:deviceWidth - 150,}}
              				  		source={Banner_Imgs.POPPAGE_CONFIRMINTEGRALTURNBUTTON}
              					/>
              				</TouchableHighlight>
      					</View>
      					

    				</View>
 			    </PopupDialog>

				<FlatList 
						 ref={(flatList)=>this._flatList = flatList}
						  ListHeaderComponent={this._header}			
						 ItemSeparatorComponent={this._separator}
						 getItemLayout={(item, index) => ( {length: scaleSize(280), offset: (scaleSize(280) + scaleSize(2)) * index, index} )}
						 renderItem={this._renderItem}
						 keyExtractor={this._keyExtractor}
						  ListEmptyComponent={this._createEmptyView()}
						 data = {this.state.data}
						/>
		</View>
		);
	}

	render() {

		if (this.state.isLoading && !this.state.error) {
			return renderLoadingView();

		} else if (this.state.error) {
			return renderErrorView(this.state.errorInfo);
		}

		return this.renderData();


	}
}

class ForumView extends Component {
	
	static navigationOptions = {
		header:false,
		tabBarLabel: "贴吧",
		tabBarIcon: ({
			tintColor
		}) => (
			<Image
			  style={[styles.icon, {tintColor: tintColor}]}
			  resizeMode='center'  
			  source={Banner_Imgs.MAINPAGEVIEW_TIEBAICON}
			/>
		),
	};

	_flatList;

	_keyExtractor = (item, index) => index;
	
	constructor(props) {
		super(props);

		this.state = {
			data: [{key:'1'},{key:'2'},{key:'3'},{key:'4'}],
			isLoading: false,
			error: false,
			errorInfo: "",
		};
	}

	componentWillMount() {
		Cookie.get(RequestUrl.LOGIN_URL, 'integral').then((cookie) => {
			this.setState({
				cookieID:cookie,
			});
			this.fetchData();
		});
		console.log('componentWillMount');
	}

		fetchData() {
		
		fetch(RequestUrl.TIEBAZHUYEPAGE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'customerId=' + this.state.cookieID
        })
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.result) {
					this.setState({
						data: responseData.result,
						isLoading: false,
					});
					ToastShow('获取数据成功',Constants.TOAST_SHORT);
				}else{
					ToastShow('获取数据失败',Constants.TOAST_SHORT);
				}

				
			})
			.catch((error) => {
				this.setState({
					error: true,
					errorInfo: error,
				});
			})
			.done();
	}
	
	_header = () =>{
		return(
		<View style = {{height:scaleSize(122),backgroundColor:'#071C2D'}}>
			<View style = {{flexDirection:'row-reverse', justifyContent:'space-between', alignItems:'center', height:scaleSize(120),backgroundColor:'#071C2D'}}>
					<TouchableHighlight onPress = {() => Alert.alert('Touch Add Button')}>
						<Image
						  style={{height:scaleSize(35),width:scaleSize(35),marginRight:scaleSize(40)}}
						  source={Banner_Imgs.TIEBAPAGE_ADDTIEZI}
						/>
					</TouchableHighlight>
						<Text style = {{fontSize:setSpText(14), color:'#F3D671',}}>贴吧</Text>
						<Text style = {{marginLeft:scaleSize(40)}}></Text>
			</View>
			<View>
				<Image
				  style={{height:scaleSize(2),width:deviceWidth}}
				  source={Banner_Imgs.TIEBAPAGE_CELLSEP}
				/>
			</View>
		</View>

		);
	}

	_renderItem = (item) =>{
		const {navigate} = this.props.navigation;
		return(
			<View style={{height:scaleSize(280)}}>
				<View style={{flex: 0.3,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:scaleSize(10)}}>
					<Image style = {{marginLeft:scaleSize(40),height:scaleSize(70),width:scaleSize(70), marginTop:scaleSize(10)}} source = {Banner_Imgs.TIEBAPAGE_TOUXIANG}/>
					<Text style = {{fontSize:setSpText(12),color:'#F3D671',alignItems:'flex-end'}}>    {item.item.createrName}</Text>
				</View>
				<TouchableHighlight style = {{flex: 0.5,}} onPress = {() => navigate('ForumViewDetail',{item:item})}>
					<View style={{flex: 1,alignItems:'flex-start',marginTop:scaleSize(10)}}>
						<Text style = {{fontSize:setSpText(11),color:'#E8DDCB',marginLeft:scaleSize(40)}}>{item.item.title}</Text>
						<Text style = {{fontSize:setSpText(9),color:'#808080',marginLeft:scaleSize(40),marginRight:scaleSize(40),marginTop:scaleSize(10)}}>{item.item.content}</Text>
					</View>
				</TouchableHighlight>
				<View style={{flex: 0.2,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
					
						<Text style={{fontSize:setSpText(9),color:'#F3D671'}}>{item.item.forumFabulousCount}赞    </Text>
					
					
						<Text style={{fontSize:setSpText(9),color:'#F3D671'}}>  {item.item.forumCommentCount}评论        </Text>
					
				</View>
			</View>
		);
	}

	renderData(){
		return(
			<View style={{flex: 1, backgroundColor:'#071C2D'}}>
				<FlatList 
						 ref={(flatList)=>this._flatList = flatList}
						  ListHeaderComponent={this._header}			
						 ItemSeparatorComponent={this._separator}
						 getItemLayout={(item, index) => ( {length: scaleSize(280), offset: (scaleSize(280) + scaleSize(2)) * index, index} )}
						 renderItem={this._renderItem}
						 keyExtractor={this._keyExtractor}
						  ListEmptyComponent={this._createEmptyView()}
						 data = {this.state.data}
						/>
		</View>
		);
	}

	_separator = () =>{
		return (
			<View>
				<Image
				  style={{height:scaleSize(2),width:deviceWidth}}
				  source={Banner_Imgs.TIEBAPAGE_CELLSEP}
				/>
			</View>
		);
	}

	_createEmptyView(){
		return (
			<Text style={{fontSize: setSpText(40), alignSelf: 'center'}}>还没有数据哦！</Text>
		);
	}

	render() {

		if (this.state.isLoading && !this.state.error) {
			return renderLoadingView();

		} else if (this.state.error) {
			return renderErrorView(this.state.errorInfo);
		}

		return this.renderData();


	}
}

class GamingView extends Component {
	render() {
		return (
			<Text>GamingView</Text>
		);
	}
}

class lotteryView extends Component {
	render() {
		return (
			<Text>lotteryView</Text>
		);
	}
}

class LifeView extends Component {
	render() {
		return (
			<Text>LifeView</Text>
		);
	}
}

class EntertainmentView extends Component {
	render() {
		return (
			<Text>EntertainmentView</Text>
		);
	}
}

class BusinessSchoolView extends Component {
	render() {
		return (
			<Text>BusinessSchoolView</Text>
		);
	}
}


//广告详情页面
class GuanggaoViewDetailView extends Component {

	constructor(props) {
		super(props);
		this.integral = '';
		this.state = {
			data: {},
			isLoading: true,
			error: false,
			errorInfo: "",
			integrals:'',
			platform:'',
		};
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		fetch(RequestUrl.MAINPAGEDETAIL_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: 'type=' + this.props.navigation.state.params.item.type + '&' +
					'indexAdvertisementId=' + this.props.navigation.state.params.item.indexAdvertisementId
			})
			.then((response) => response.json())
			.then((responseJson) => {
				console.log("responseJsonssss:" + responseJson.message.indexAdvertisementId);
				this.setState({
					data: responseJson.message,
					isLoading: false,
				});
			})
			.catch((error) => {
				this.setState({
					error: true,
					errorInfo: error,
				});
			})
			.done();
	}

	componentWillMount() {
		Cookie.get(RequestUrl.LOGIN_URL, 'integral').then((cookie) => {
			this.setState({
				integrals:cookie,
			});
		});
		console.log('componentWillMount');
	}

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
         				body: 'customerId=' + cookie + '&' + 'amount=' + this.integral + '&' + 'type=' + this.state.platform
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
          						integrals:this.state.integrals - this.integral,
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

	renderData() {
		const{navigation} = this.props;
		return(
			<View style={{flex: 1,backgroundColor:'#071C2D'}}>
						
				<PopupDialog  dialogTitle={<DialogTitle title="积分转入" titleStyle = {{backgroundColor:'#F3D671',}} titleTextStyle = {{fontSize:setSpText(14),color:'black',textAlignVertical:'center'}}/>}
    				ref={(popupDialog) => { this.popupDialog = popupDialog; }}
    				 dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' }) }
					 width = {deviceWidth - 80}
					 height = {deviceHeight/2-50}
					 overlayOpacity = {0.8}
    				 >
    				<View style = {{flex: 1, backgroundColor:'#071C2D'}}>
      					
      					<View style={{flex: 0.5,marginTop:scaleSize(40)}}>
      						<Text style={{fontSize:setSpText(10),color:'rgb(248,231,162)',marginLeft:scaleSize(50),textAlignVertical:'center'}}>账户积分:    {this.state.integrals}</Text>
      						
      						<View style={{flex: 0.5,flexDirection:'row',alignItems:'center',marginTop:scaleSize(40)}}>
      						<Text style={{fontSize:setSpText(10),color:'rgb(248,231,162)',marginLeft:scaleSize(50),textAlignVertical:'center',}}>转入积分:    </Text>
      						<TextInput  style={{height:scaleSize(80),width:scaleSize(300),fontSize:setSpText(11),color:'#F3D671',borderColor: 'gray', borderWidth: 1,borderRadius:4}}  
               					onChangeText={(text) =>this.integral = text}
                				placeholder = "请输入转入的积分" 
                				placeholderTextColor  = 'gray'
              					secureTextEntry  = {false}
              					underlineColorAndroid = 'transparent'
              					keyboardType = 'numeric'
              				/>
      						</View>
      					</View>
      					
      					<View style = {{flex: 0.3,alignItems:'center'}}>
							<TouchableHighlight onPress={() => {
								if (this.integral != null && this.integral != '') {
									console.log('this.integralssswwww:' + this.integral);
									this.popupDialog.dismiss();
									this.fetchIntegralData();
								}else
								{
									ToastShow('转入积分不能小于0！',Constants.TOAST_SHORT);
								}
							}}>
              				 	<Image
              				 		style={{height:(deviceHeight/2 - 100)/5,width:deviceWidth - 150,}}
              				  		source={Banner_Imgs.POPPAGE_CONFIRMINTEGRALTURNBUTTON}
              					/>
              				</TouchableHighlight>
      					</View>
    				</View>
 			    </PopupDialog>

				<View style = {{flex: 0.1, flexDirection:'row', justifyContent:'space-between', alignItems:'center', height:scaleSize(120),backgroundColor:'#071C2D'}}>
						<Text style = {{fontSize:setSpText(11), color:'#F3D671',}} onPress = {() => navigation.goBack()}>     返回</Text>
						<Text style = {{fontSize:setSpText(14), color:'#F3D671',}}>外汇详情          </Text>
						<Text></Text>
				</View>
				<View style={{flex: 0.8,backgroundColor:'#0F2435'}}>
						<View style={{flex: 0.9,justifyContent:'center',alignItems:'center'}}>
							<Text style={{flex: 0.1,fontSize:setSpText(12),color:'#F3D671',marginTop:scaleSize(20)}}>
							  {this.state.data.title}
							</Text>
							<Image
							  style={{flex: 0.3,width:deviceWidth-20,height:scaleSize(248)}}
							  source={Banner_Imgs.GUANGGAOPAGE_BANNER}
							/>
							<Text style={{flex: 0.6,fontSize:setSpText(11),width:deviceWidth-20,color:'rgb(128,128,128)',marginTop:scaleSize(36)}}>
							      {this.state.data.content}
							</Text>
						</View>
						<View style={{flex: 0.1,}}>
							<Text style={{textAlign:'right',fontSize:setSpText(9),color:'rgb(128,128,128)',marginLeft:scaleSize(100),marginTop:scaleSize(20)}}>{this.state.data.createDate}        </Text>
						</View>
				</View>
				
				<View style={{flex: 0.1,backgroundColor:'#071C2D',}}>
					<Image
				  		style={{ height:scaleSize(2),width:deviceWidth,opacity:0.6}}
				  		source={Banner_Imgs.GUANGGAOPAGE_FENGEFU}
					/>
				
						<Text style = {{flex: 0.95,fontSize:setSpText(11),color:'#F3D671',textAlign:'center',textAlignVertical:'center'}} onPress={() => this.popupDialog.show()}>
					  		立即参与
						</Text>
			
				</View>
				
			</View>
		);
	}

	render() {

		const {
			navigate
		} = this.props.navigation;

		if (this.state.isLoading && !this.state.error) {
			return renderLoadingView();

		} else if (this.state.error) {
			return renderErrorView(this.state.errorInfo);
		}

		return this.renderData();

	}
}

//外汇详情页面
class ForeignExchangeDetailView extends Component{
	static navigationOptions = ({
		navigation
	}) => ({
		header:true,
	});

	constructor(props) {
		super(props);

		this.state = {
			data: [],
			isLoading: false,
			error: false,
			errorInfo: "",
			newOrOld:true,
		};
	}
	
	render() {

		if (this.state.isLoading && !this.state.error) {
			return renderLoadingView();

		} else if (this.state.error) {
			return renderErrorView(this.state.errorInfo);
		}

		return this.renderData();


	}


	renderData(){
		switch (this.props.navigation.state.params.key){
				case '1':
						return this.renderNiuRenBang();
					break;
				case '2':
						return this.renderPicturePage();
					break;
				case '3':
						return this.renderPingtaijieshao();
						break;
				case '4':
						return this.renderPingzhonggenxin();
					break;
				default:
						return this.renderDefault();
			}
	}

	renderNiuRenBang(){
		const {navigation} = this.props;
		return(
			<View style = {{flex: 1,backgroundColor:'#071C2D'}}>
				<View style = {{flexDirection:'row',justifyContent:'space-between', alignItems:'center', height:scaleSize(120),}}>
						<Text style = {{fontSize:setSpText(11), color:'#F3D671'}} onPress = {() => navigation.goBack()} >    返回</Text>
						<Text style = {{fontSize:setSpText(14), color:'#F3D671'}}>牛人榜       </Text>
						<Text></Text>
				</View>

				<View style = {{flex: 0.1,}}>
					<TouchableHighlight style = {{flex: 1,alignItems:'center'}} onPress = {() => this.setState({
								newOrOld:this.state.newOrOld?false:true,
							})} underlayColor = '#071C2D'>

								<Image
								  style={{height:scaleSize(60),width:scaleSize(370),resizeMode:'cover',marginTop:scaleSize(5)}}
								  source={this.state.newOrOld?Banner_Imgs.NIURENBANGPAGE_JIJINNIUREN:Banner_Imgs.NIURENBANGPAGE_WENJIANNNIUREN}
								/>
								
							</TouchableHighlight>
				</View>
			
				<View style={{flex: 0.9, backgroundColor:'rgb(255,0,0)'}}>
					<Image
				  		style={{height:scaleSize(1050),width:deviceWidth,resizeMode:'stretch'}}
				  		source={Banner_Imgs.linshi_niurenbang}
					/>
				</View>
			</View>


		);
	}
	
	renderPicturePage(){
		const{navigation} = this.props;
		return(
			<View style = {{flex: 1,backgroundColor:'#071C2D'}}>
			<View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center', height:scaleSize(120),width:deviceWidth,backgroundColor:'#071C2D'}}>
						<Text style = {{fontSize:setSpText(11), color:'#F3D671',}} onPress = {() => navigation.goBack()}>     返回</Text>
						<Text style = {{fontSize:setSpText(14), color:'#F3D671',}}>资金安全         </Text>
						<Text></Text>
				</View>
			<Swiper  
			style={styles.wrapper} 
			smoothTransition
  			loop
  			
  			showPaginationBelow = {true}
			>
				<View style={styles.slide1}>
    				<Image
    				 style = {{height:deviceHeight,width:deviceWidth}}
    				  source={Banner_Imgs.GUANGGAOPAGE_BG01}
    				/>
    				
 			 	</View>
  				<View style={styles.slide2}>
    				<Image
    				  style = {{height:deviceHeight,width:deviceWidth}}
    				  source={Banner_Imgs.GUANGGAOPAGE_BG02}
    				/>
    				
  				</View>
  				<View style={styles.slide3}>
    				<Image
    				  style = {{height:deviceHeight,width:deviceWidth}}
    				  source={Banner_Imgs.GUANGGAOPAGE_BG03}
    				/>
    				
  				</View>
  			</Swiper>
  			</View>
		);
	}

	renderPingtaijieshao(){
		const{navigation} = this.props;
		return (
			<View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
			<View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center', height:scaleSize(120),width:deviceWidth,backgroundColor:'#071C2D'}}>
						<Text style = {{fontSize:setSpText(11), color:'#F3D671',}} onPress = {() => navigation.goBack()}>     返回</Text>
						<Text style = {{fontSize:setSpText(14), color:'#F3D671',}}>平台介绍         </Text>
						<Text></Text>
				</View>
				<Image
				  style={{flex: 1,height:deviceHeight,width:deviceWidth}}
				  source={Banner_Imgs.ABOUTUS_BG}
				/>
				
			</View>
		);
	}

	renderPingzhonggenxin(){
		const{navigation} = this.props;
		return (
			<View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
			<View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center', height:scaleSize(120),width:deviceWidth,backgroundColor:'#071C2D'}}>
						<Text style = {{fontSize:setSpText(11), color:'#F3D671',}} onPress = {() => navigation.goBack()}>     返回</Text>
						<Text style = {{fontSize:setSpText(14), color:'#F3D671',}}>品种更新         </Text>
						<Text></Text>
				</View>
				<Image
				  style={{flex: 1,height:deviceHeight,width:deviceWidth}}
				  source={Banner_Imgs.ABOUTUS_BG}
				/>
				
			</View>
		);
	}

	renderDefault(){
		return(<Text>renderDefault</Text>);
	}

}

//贴吧详情页面
class ForumViewDetail extends Component{
	_flatList;

	_keyExtractor = (item, index) => index;
	
	constructor(props) {
		super(props);

		this.state = {
			data: [{key:'1'},{key:'2'},{key:'3'},{key:'4'}],
			isLoading: false,
			error: false,
			errorInfo: "",
		};
	}
	
	_header = () =>{
		const{navigation} = this.props;
		return(
		<View style = {{height:scaleSize(862),backgroundColor:'#071C2D'}}>
			<View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center', height:scaleSize(120),backgroundColor:'#071C2D'}}>
						<Text style = {{fontSize:setSpText(11), color:'#F3D671',}} onPress = {() => navigation.goBack()}>     返回</Text>
						<Text style = {{fontSize:setSpText(14), color:'#F3D671',}}>贴吧详情        </Text>
						<Text></Text>
			</View>
			<View>
				<Image
				  style={{height:scaleSize(2),width:deviceWidth}}
				  source={Banner_Imgs.TIEBAPAGE_CELLSEP}
				/>
			</View>

			<View style={{height:scaleSize(630),}}>
			<View style={{flex: 0.15,flexDirection:'row',justifyContent:'flex-start',}}>
					<Image style = {{marginLeft:scaleSize(40),height:scaleSize(70),width:scaleSize(70), marginTop:scaleSize(10)}} source = {Banner_Imgs.TIEBAPAGE_TOUXIANG}/>
					<Text style = {{fontSize:setSpText(12),color:'#F3D671',alignItems:'flex-end',textAlignVertical:'center',marginTop:scaleSize(10)}}>    陈建辉</Text>
				</View>

					<View style={{flex: 0.6, marginTop:scaleSize(20),}}>
						<Text style = {{fontSize:setSpText(11),color:'#E8DDCB',marginLeft:scaleSize(40)}}>聚美优品真的超级划算，福利大大的！</Text>
						<Text style = {{fontSize:setSpText(9),color:'#808080',marginLeft:scaleSize(40),marginRight:scaleSize(40),marginTop:scaleSize(10)}}>        聚美优品真的超级划算，福利大大的！啊好的稍等哈接电话结婚的很多化建设等哈回答时间的话按时爱思垃圾快点哈实力肯定华山路空的话爱的合适的话撒的撒料打哪。。。</Text>
						<Image
						  style={{height:scaleSize(200),width:scaleSize(200),marginLeft:scaleSize(40),marginTop:scaleSize(20)}}
						  source={Banner_Imgs.MAINPAGEVIEW_BANNER}
						/>
						
					</View>
			
				<View style={{flex: 0.25,flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginTop:scaleSize(160)}}>
					
					<TouchableHighlight onPress = {() => Alert.alert('397赞')}>
						<Image
						  style={{height:scaleSize(32),width:scaleSize(32)}}
						  source={Banner_Imgs.TIEBAPAGE_DIANZAN}
						/>
						</TouchableHighlight>
						<Text style = {{fontSize:setSpText(10),color:'rgb(128,128,128)'}}>    160    </Text>
					
					<TouchableHighlight onPress = {() => Alert.alert('3977评论 ')}>
						<Image
						  style={{height:scaleSize(32),width:scaleSize(32)}}
						  source={Banner_Imgs.TIEBAPAGE_PINGLUN}
						/>
					</TouchableHighlight>
					<Text style = {{fontSize:setSpText(10),color:'rgb(128,128,128)'}}>    115    </Text>
				</View>
			</View>
			<View style={{height:scaleSize(100),backgroundColor:'rgb(15,36,53)',justifyContent:'center'}}>
				<Text style = {{fontSize:setSpText(11),color:'#F3D671',}}>     全部评论    119</Text>
			</View>
		</View>

		);
	}

	_renderItem = (item) =>{
		
		return(
			<View style={{height:scaleSize(250)}}>
				<View style={{flex: 0.3,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
					<Image style = {{marginLeft:scaleSize(40),height:scaleSize(61),width:scaleSize(61), marginTop:scaleSize(10)}} source = {Banner_Imgs.TIEBAPAGE_TOUXIANG}/>
					<Text style = {{fontSize:setSpText(12),color:'#F3D671',alignItems:'flex-end'}}>    陈建辉</Text>
				</View>
				
					<View style={{flex: 0.5}}>
						<Text style = {{fontSize:setSpText(9),color:'#808080',marginLeft:scaleSize(120),marginRight:scaleSize(40)}}>聚美优品真的超级划算，福利大大的！啊好的稍等哈接电话结婚的很多化建设等哈回答时间的话按时爱思垃圾快点哈实力肯定华山路空的话爱的合适的话撒的撒料打哪。。。</Text>
						<Text style = {{textAlign:'right',fontSize:setSpText(9),color:'rgb(128,128,128)',marginRight:scaleSize(40)}}>2小时前</Text>
					</View>
				
				<View style={{flex: 0.2,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
				</View>
			</View>
		);
	}

	renderData(){
		return(
			<View style={{flex: 1, backgroundColor:'#071C2D'}}>
				<FlatList 
						 ref={(flatList)=>this._flatList = flatList}
						  ListHeaderComponent={this._header}			
						 ItemSeparatorComponent={this._separator}
						 getItemLayout={(item, index) => ( {length: scaleSize(280), offset: (scaleSize(280) + scaleSize(2)) * index, index} )}
						 renderItem={this._renderItem}
						 keyExtractor={this._keyExtractor}
						  ListEmptyComponent={this._createEmptyView()}
						 data = {this.state.data}
						/>
		</View>
		);
	}

	_separator = () =>{
		return (
			<View>
				<View style={{height:scaleSize(20)}}>
				</View>
				<Image
				  style={{height:scaleSize(2),width:deviceWidth}}
				  source={Banner_Imgs.TIEBAPAGE_CELLSEP}
				/>
			</View>
		);
	}

	_createEmptyView(){
		return (
			<Text style={{fontSize: setSpText(40), alignSelf: 'center'}}>还没有数据哦！</Text>
		);
	}

	render() {

		if (this.state.isLoading && !this.state.error) {
			return renderLoadingView();

		} else if (this.state.error) {
			return renderErrorView(this.state.errorInfo);
		}

		return this.renderData();


	}
}



const RootTabNavigationBar = TabNavigator({
	Consultation: {
		screen: ConsultationView,
	},
	ForeignExchange: {
		screen: ForeignExchangeView,
	},
	IntegralIncrement: {
		screen: IntegralIncrementView,
	},
	Forum: {
		screen: ForumView,
	},
	// Gaming:{
	// 	screen:GamingView,
	// },
	// lottery:{
	// 	screen:lotteryView,
	// },
	// Life:{
	// 	screen:LifeView,
	// },
	// Entertainment:{
	// 	screen:EntertainmentView,
	// },
	// BusinessSchool:{
	// 	screen:BusinessSchoolView,
	// }
}, {
	tabBarPosition: 'bottom',
	animationEnabled: true,
	// swipeEnabled:false, //滑动切换TabBar
	// lazy:true,
	// backBehavior:true,
	tabBarOptions: {
		showIcon: true,
		pressOpacity: 0.8,
		activeTintColor: '#F3D671',
		style: {
			height: 50,
			backgroundColor: '#071C2D',  
			zIndex: 0,
			position: 'relative'
		},
		labelStyle: {
			fontSize: 11,
			paddingVertical: 0,
			marginTop: -4
		},
		iconStyle: {
			marginTop: -3
		},
		tabStyle: {
			//backgroundColor: 'rgb(230,69,51)',  
		},
		indicatorStyle: {
			height: 0 // 如TabBar下面显示有一条线，可以设高度为0后隐藏
		},
	},
});


class TabNavigatorRoot extends Component {
	render() {
		return (
			<RootTabNavigationBar />
		);
	}
}

const styles = StyleSheet.create({
	txt: {
		textAlign: 'center',
		textAlignVertical: 'center',
		color: 'white',
		fontSize: setSpText(30),
	},
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	title: {
		fontSize: setSpText(15),
		color: 'blue',
	},
	content: {
		fontSize: setSpText(15),
		color: 'black',
	},
	icon: {
		width: scaleSize(52),
		height: scaleSize(52),
	},
	wrapper: {
		
    backgroundColor: '#071C2D',
    
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  bannerContainer: {  
        flex: 1,  
        flexDirection: 'row',  
        alignItems: 'flex-start',  
        paddingTop:5,  
        paddingLeft:5,  
        backgroundColor:'#999999',  
        paddingRight:5,  
        paddingBottom:5,  
    }, 
    page: {  
        width: deviceWidth,//设备宽(只是一种实现，此处多余)  
        flex: 1,  
        height: scaleSize(280),  
        resizeMode: 'cover'  
    },  
});

export {
	TabNavigatorRoot,
	RootTabNavigationBar,
	GuanggaoViewDetailView,
	ForeignExchangeDetailView,
	ForumViewDetail
};