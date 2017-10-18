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
	ProgressBarAndroid
} from 'react-native';
import {
	TabNavigator
} from 'react-navigation';

import {
	RequestUrl,
	Banner_Imgs,
} from '../Public/Constants.js';

import {
	renderLoadingView,
	renderErrorView,
} from '../Public/Utils.js';
import {
	scaleSize,
	setSpText,
	deviceWidth
} from '../Public/ScreenAdaptationUtil.js';


var ITEM_HEIGHT = 400;

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
		header: false,
		tabBarLabel: '首页',
		tabBarIcon: ({
			tintColor
		}) => (
			<Image
			  style={[styles.icon, {tintColor: tintColor}]}
			  resizeMode='contain'  
			  source={Banner_Imgs.MAINPAGEVIEW_HOMEICON}
			/>

		),
	});

	constructor(props) {
		super(props);

		this.state = {
			data: [],
			isLoading: true,
			error: false,
			errorInfo: "",
		};
	}

	componentDidMount() {
		this.fetchData();
	}



	fetchData() {
		fetch(RequestUrl.MAINPAGEVIEW_URL)
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({
					data: responseData.index,
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

	_header = () => {
		const {
			navigation
		} = this.props;
		return (
			<View style = {{flex: 1,height:scaleSize(610)}}>
					<View style = {{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', height:scaleSize(120),backgroundColor:'#000000'}}>
						<TouchableHighlight onPress = {() => {
						navigation.navigate('DrawerOpen');
						}}>
							<Image
					  			style={{width:scaleSize(58),height:scaleSize(58)}}
					  			source={Banner_Imgs.MAINPAGEVIEW_TOPICON}
								/>
						</TouchableHighlight>
						<Text style = {{fontSize:setSpText(10), color:'#F3D671'}}>
							1500积分
						</Text>
					</View>


						<Image source = {Banner_Imgs.MAINPAGEVIEW_BANNER} style = {{height:scaleSize(280), width:deviceWidth, resizeMode:'cover',}} />
					
	

					<View style={{height:scaleSize(25),backgroundColor:'#071C2D'}}/>

					<View style={{flexDirection:'row',height:scaleSize(155), backgroundColor:'#0F2435'}}>

						<TouchableHighlight style = {{flex: 0.25,}} onPress = {() => Alert.alert('Touch MT4')}>
							<View style={{flex: 1, alignItems:'center',justifyContent:'center'}}>
								<Image
							  	style={{width:scaleSize(58),height:scaleSize(58),}}
							  	source={Banner_Imgs.MAINPAGEVIEW_TOPICON}
								/>
								<Text style = {{fontSize:setSpText(10), color:'#F3D671'}}>平台一</Text>
							</View>
						</TouchableHighlight>
						
						<TouchableHighlight style = {{flex: 0.25,}} onPress = {() => Alert.alert('Touch MT3')}>
							<View style={{flex: 1, alignItems:'center',justifyContent:'center'}}>
								<Image
							  	style={{width:scaleSize(58),height:scaleSize(58),}}
							  	source={Banner_Imgs.MAINPAGEVIEW_TOPICON}
								/>
								<Text style = {{fontSize:setSpText(10), color:'#F3D671'}}>平台二</Text>
							</View>
						</TouchableHighlight>

						<TouchableHighlight style = {{flex: 0.25,}} onPress = {() => Alert.alert('Touch MT2')}>
							<View style={{flex: 1, alignItems:'center',justifyContent:'center'}}>
								<Image
							  	style={{width:scaleSize(58),height:scaleSize(58),}}
							  	source={Banner_Imgs.MAINPAGEVIEW_TOPICON}
								/>
								<Text style = {{fontSize:setSpText(10), color:'#F3D671'}}>平台三</Text>
							</View>
						</TouchableHighlight>

						<TouchableHighlight style = {{flex: 0.25,}} onPress = {() => Alert.alert('Touch MT1')}>
							<View style={{flex: 1, alignItems:'center',justifyContent:'center'}}>
								<Image
							  	style={{width:scaleSize(58),height:scaleSize(58),}}
							  	source={Banner_Imgs.MAINPAGEVIEW_TOPICON}
								/>
								<Text style = {{fontSize:setSpText(10), color:'#F3D671'}}>平台四</Text>
							</View>
						</TouchableHighlight>
						
					</View>

					<View style={{height:scaleSize(30),backgroundColor:'#071C2D'}}/>
			</View>
		);
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
			<View style={{height:scaleSize(400),backgroundColor:'#0F2435'}}>
				<View style={{flex: 0.15, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style = {{fontSize:setSpText(11),color:'#F3D671'}}>{item.item.title}</Text>
					<Text style = {{fontSize:setSpText(8),color:'#F3D671'}}>{item.item.createDate}</Text>
				</View>
				<View style={{flex: 0.7, backgroundColor:'#FFFFFF'}}>

					<Image style = {{height:scaleSize(280),width:deviceWidth,resizeMode:'cover'}}
				  		source={Banner_Imgs.MAINPAGETIEBABACK}>

						<Text style = {{flex: 0.7, textAlign:'center',textAlignVertical:'bottom'}}>{item.item.content}</Text>
						<View style={{flex:0.3,flexDirection:'row'}}>
							<Text style = {{flex: 0.5, textAlign:'right',textAlignVertical:'center'}}>晒贴人:{item.item.createrName}</Text>
							<Text style = {{flex: 0.5, textAlign:'left',textAlignVertical:'center'}}>|跟帖数:{item.item.count}</Text>
						</View>
					</Image>
				</View>
				<View style={{flex: 0.15,}}>
					<TouchableHighlight style = {{flex: 1,}} onPress = {() => navigate('ConsultationViewDetailView',{item:item.item})}>
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
			<View style={{height:scaleSize(400),backgroundColor:'#0F2435'}}>
				<View style={{flex: 0.15, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style = {{fontSize:setSpText(11),color:'#F3D671'}}>{item.item.title}</Text>
					<Text style = {{fontSize:setSpText(8),color:'#F3D671'}}>{item.item.createDate}</Text>
				</View>
				<View style={{flex: 0.7,}}>
					<Image
				  		style = {{height:scaleSize(280),width:deviceWidth,resizeMode:'cover'}}
				  		source={{uri:item.item.indexImg}}
					/>
				</View>
				<View style={{flex: 0.15,}}>
					<TouchableHighlight style = {{flex: 1,}} onPress = {() => navigate('ConsultationViewDetailView',{item:item.item})}>
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
			  resizeMode='contain'  
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
			<View style = {{flexDirection:'row', justifyContent:'center', alignItems:'center', height:scaleSize(120),backgroundColor:'#000000'}}>
						<Text style = {{fontSize:scaleSize(50), color:'#F3D671'}}>外汇</Text>
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
			<TouchableHighlight style = {{flex: 1,}} onPress = {() => navigate('ForeignExchangeDetailView',{key:item.item.key})}>
				<Image source = {picUrl} 
				style = {{height:scaleSize(250), width:deviceWidth, resizeMode:'cover',}}/>
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
	
	constructor(props) {
		super(props);

		this.state = {
			data: [{key:'1'},{key:'2'},{key:'3'},{key:'4'}],
			isLoading: false,
			error: false,
			errorInfo: "",
			progress:0.1,
			newOrOld:true,
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

	static navigationOptions = {
		header:false,
		tabBarLabel: "积分增值",
		tabBarIcon: ({
			tintColor
		}) => (
			<Image
			  style={[styles.icon, {tintColor: tintColor}]}
			  resizeMode='contain'  
			  source={Banner_Imgs.MAINPAGEVIEW_ZENGZHIICON}
			/>

		),
	};

	_header = () =>{
		return(
		<View style = {{height:scaleSize(280),backgroundColor:'#000000'}}>
			<View style = {{flexDirection:'row', justifyContent:'center', alignItems:'center', height:scaleSize(120),backgroundColor:'#000000'}}>
						<Text style = {{fontSize:scaleSize(50), color:'#F3D671'}}>积分增值</Text>
			</View>

			<View style = {{flexDirection:'row',justifyContent:'center',alignItems:'center',height:scaleSize(100),backgroundColor:'#000008'}}>
				<Button onPress = {() => this.setState({
					newOrOld:true,
				})} title = '新手投资'/>
				<Button onPress = {() => this.setState({
					newOrOld:false,
				})} title = '定期投资'/>
			</View>

			

			<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:scaleSize(60),backgroundColor:'#0F2435'}}>
				<Text style = {{fontSize:setSpText(11),color:'#F3D671',}}>
					{this.state.newOrOld?'     新手投资':'     定期投资'}
				</Text>
				<Text style = {{fontSize:setSpText(11),color:'#F3D671'}}>
					{this.state.newOrOld?'':'已成功1000期     '}
				</Text>
			</View>
		</View>
		);
	}

	_separator = () =>{
		return <View style={{height:scaleSize(2),backgroundColor:'#071C2D'}}/>;
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
				<TouchableHighlight style = {{flex: 1,}} onPress = {() => Alert.alert('touch ok')}>
					<View style={{height:scaleSize(200), backgroundColor:'#0F2435'}}>	
						<View style={{flex: 0.4,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
							<Text style = {{fontSize:setSpText(15),color:'red'}}>8.0%</Text>
							<Text style = {{fontSize:setSpText(10),color:'#F3D671'}}>        3个月</Text>
							<Text style = {{fontSize:setSpText(10),color:'#F3D671'}}>已投56人</Text>
						</View>
						<View style={{flex: 0.3,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
							<Text style = {{fontSize:setSpText(10),color:'#808080'}}>历史参考收益</Text>
							<Text style = {{fontSize:setSpText(10),color:'#808080'}}>投资期限</Text>
							<Text style = {{fontSize:setSpText(10),color:'#808080'}}>融资300.00万</Text>
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
			<TouchableHighlight style = {{flex: 1,}} onPress = {() => Alert.alert('touch ok')}>
				<View style={{height:scaleSize(200), backgroundColor:'#0F2435'}}>
					<View style={{flex: 0.4,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
						<Text style = {{fontSize:setSpText(15),color:'red'}}>8.0%</Text>
						<Text style = {{fontSize:setSpText(10),color:'#F3D671'}}>        3个月</Text>
						<Text style = {{fontSize:setSpText(10),color:'#F3D671'}}>已投56人</Text>
					</View>
					<View style={{flex: 0.3,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
						<Text style = {{fontSize:setSpText(10),color:'#808080'}}>历史参考收益</Text>
						<Text style = {{fontSize:setSpText(10),color:'#808080'}}>投资期限</Text>
						<Text style = {{fontSize:setSpText(10),color:'#808080'}}>融资300.00万</Text>
					</View>
					<View style={{flex: 0.3,}}>
						<ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress = {this.state.progress} color = '#F3D671'/>
					</View>
				</View>
			</TouchableHighlight>
			);
		}
		
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
			  resizeMode='contain'  
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
	
	_header = () =>{
		return(
		<View style = {{height:scaleSize(122),backgroundColor:'#000000'}}>
			<View style = {{flexDirection:'row-reverse', justifyContent:'space-between', alignItems:'center', height:scaleSize(120),backgroundColor:'#000000'}}>
					<TouchableHighlight onPress = {() => Alert.alert('Touch Add Button')}>
						<Image
						  style={{height:scaleSize(35),width:scaleSize(35),marginRight:scaleSize(40)}}
						  source={Banner_Imgs.TIEBAPAGE_ADDTIEZI}
						/>
					</TouchableHighlight>
						<Text style = {{fontSize:scaleSize(50), color:'#F3D671',}}>贴吧</Text>
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
				<View style={{flex: 0.3,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
					<Image style = {{marginLeft:scaleSize(40),height:scaleSize(61),width:scaleSize(61), marginTop:scaleSize(10)}} source = {Banner_Imgs.TIEBAPAGE_TOUXIANG}/>
					<Text style = {{fontSize:setSpText(15),color:'#F3D671',alignItems:'flex-end'}}>    陈建辉</Text>
				</View>
				<TouchableHighlight style = {{flex: 0.5,}} onPress = {() => navigate('ForumViewDetail',{item:item})}>
					<View style={{flex: 1,alignItems:'center'}}>
						<Text style = {{fontSize:setSpText(13),color:'#E8DDCB'}}>聚美优品真的超级划算，福利大大的！</Text>
						<Text style = {{fontSize:setSpText(10),color:'#808080',marginLeft:scaleSize(40),marginRight:scaleSize(40)}}>聚美优品真的超级划算，福利大大的！啊好的稍等哈接电话结婚的很多化建设等哈回答时间的话按时爱思垃圾快点哈实力肯定华山路空的话爱的合适的话撒的撒料打哪。。。</Text>
					</View>
				</TouchableHighlight>
				<View style={{flex: 0.2,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
					<TouchableHighlight onPress = {() => Alert.alert('397赞')}>
						<Text style={{fontSize:setSpText(10),color:'#F3D671'}}>397赞    </Text>
					</TouchableHighlight>
					<TouchableHighlight onPress = {() => Alert.alert('3977评论 ')}>
						<Text style={{fontSize:setSpText(10),color:'#F3D671'}}>  3977评论      </Text>
					</TouchableHighlight>
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


//主页详情页面
class ConsultationViewDetailView extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: {},
			isLoading: true,
			error: false,
			errorInfo: "",
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

	renderData() {

		switch (this.state.data.type) {
			case '0':
				return this.drawTieBaView();
				break;
			case '1':
			case '2':
				return this.drawGuangGaoView();
				break;
			default:
				return this.drawDefaultView();

		}
	}

	drawTieBaView() {
		return (<Text>drawTieBaView</Text>);
	}

	drawGuangGaoView() {
		return (<Text>drawGuangGaoView</Text>);
	}

	drawDefaultView() {
		return (<Text>drawDefaultView</Text>);
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
				case '3':
				case '4':
						return this.renderPicturePage();
					break;
				default:
						return this.renderDefault();
			}
	}

	renderNiuRenBang(){
		const {navigation} = this.props;
		return(
			<View style = {{flex: 1,backgroundColor:'#000000'}}>
				<View style = {{flexDirection:'row',justifyContent:'space-between', alignItems:'center', height:scaleSize(120),}}>
						<Text style = {{fontSize:setSpText(15), color:'#F3D671'}} onPress = {() => navigation.goBack()} >返回</Text>
						<Text style = {{fontSize:setSpText(20), color:'#F3D671'}}>牛人榜</Text>
						<Text></Text>
				</View>

				<View style = {{flexDirection:'row',justifyContent:'center',alignItems:'center',height:scaleSize(120),}}>
					<TouchableHighlight onPress = {() => this.setState({
								newOrOld:this.state.newOrOld?false:true,
							})} underlayColor = '#000000'>

								<Image
								  style={{height:scaleSize(50),width:scaleSize(320)}}
								  source={this.state.newOrOld?Banner_Imgs.NIURENBANGPAGE_JIJINNIUREN:Banner_Imgs.NIURENBANGPAGE_WENJIANNNIUREN}
								/>
								
							</TouchableHighlight>
				</View>

				
					<Image
				  		style={{height:scaleSize(1000),width:deviceWidth}}
				  		source={Banner_Imgs.linshi_niurenbang}
					/>
				

			</View>


		);
	}
	
	renderPicturePage(){
		return(<Text>renderPicturePage</Text>);
	}

	renderDefault(){
		return(<Text>renderDefault</Text>);
	}

}

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
		<View style = {{height:scaleSize(800),backgroundColor:'#071C2D'}}>
			<View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center', height:scaleSize(120),backgroundColor:'#000000'}}>
						<Text style = {{fontSize:setSpText(15), color:'#F3D671',}} onPress = {() => navigation.goBack()}>     返回</Text>
						<Text style = {{fontSize:setSpText(20), color:'#F3D671',}}>贴吧详情    </Text>
						<Text></Text>
			</View>
			<View>
				<Image
				  style={{height:scaleSize(2),width:deviceWidth}}
				  source={Banner_Imgs.TIEBAPAGE_CELLSEP}
				/>
			</View>

			<View style={{height:scaleSize(620)}}>
			<View style={{flex: 0.3,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
					<Image style = {{marginLeft:scaleSize(40),height:scaleSize(61),width:scaleSize(61), marginTop:scaleSize(10)}} source = {Banner_Imgs.TIEBAPAGE_TOUXIANG}/>
					<Text style = {{fontSize:setSpText(15),color:'#F3D671',alignItems:'flex-end'}}>    陈建辉</Text>
				</View>

					<View style={{flex: 0.5,}}>
						<Text style = {{fontSize:setSpText(13),color:'#E8DDCB',marginLeft:scaleSize(40)}}>聚美优品真的超级划算，福利大大的！</Text>
						<Text style = {{fontSize:setSpText(10),color:'#808080',marginLeft:scaleSize(40),marginRight:scaleSize(40)}}>        聚美优品真的超级划算，福利大大的！啊好的稍等哈接电话结婚的很多化建设等哈回答时间的话按时爱思垃圾快点哈实力肯定华山路空的话爱的合适的话撒的撒料打哪。。。</Text>
						<Image
						  style={{height:scaleSize(200),width:scaleSize(200),marginLeft:scaleSize(40)}}
						  source={Banner_Imgs.MAINPAGEVIEW_BANNER}
						/>
						
					</View>
			
				<View style={{flex: 0.2,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
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
			<View style={{height:scaleSize(50),backgroundColor:'rgb(15,36,53)'}}>
				<Text style = {{fontSize:setSpText(15),color:'#F3D671'}}>     全部评论    119</Text>
			</View>
		</View>

		);
	}

	_renderItem = (item) =>{
		
		return(
			<View style={{height:scaleSize(250)}}>
				<View style={{flex: 0.3,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
					<Image style = {{marginLeft:scaleSize(40),height:scaleSize(61),width:scaleSize(61), marginTop:scaleSize(10)}} source = {Banner_Imgs.TIEBAPAGE_TOUXIANG}/>
					<Text style = {{fontSize:setSpText(15),color:'#F3D671',alignItems:'flex-end'}}>    陈建辉</Text>
				</View>
				
					<View style={{flex: 0.5}}>
						<Text style = {{fontSize:setSpText(10),color:'#808080',marginLeft:scaleSize(120),marginRight:scaleSize(40)}}>聚美优品真的超级划算，福利大大的！啊好的稍等哈接电话结婚的很多化建设等哈回答时间的话按时爱思垃圾快点哈实力肯定华山路空的话爱的合适的话撒的撒料打哪。。。</Text>
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
			backgroundColor: '#0D2233',  
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
});

export {
	TabNavigatorRoot,
	RootTabNavigationBar,
	ConsultationViewDetailView,
	ForeignExchangeDetailView,
	ForumViewDetail
};