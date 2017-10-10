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


var ITEM_HEIGHT = 100;

class ConsultationView extends Component {

	_flatList;

	_keyExtractor = (item, index) => index;

	static navigationOptions = ({
		navigation
	}) => ({
		headerLeft: < Text onPress = {
				() => {
					navigation.navigate('DrawerOpen');
				}
			} >
			More < /Text>,
		header: false,
		tabBarLabel: '首页',
		tabBarIcon: ({
			tintColor
		}) => (
			<Image
			  style={[styles.icon, {tintColor: tintColor}]}
			  resizeMode='contain'  
			  source={Banner_Imgs.MAINPAGEVIEW_TOPICON}
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
			<View style = {{flex: 1,height:200}}>
					<Image source = {Banner_Imgs.MAINPAGEVIEW_BANNER} style = {{flex: 0.7,resizeMode:'stretch'}}>
					<TouchableHighlight onPress = {() => {
						navigation.navigate('DrawerOpen');
						}}>
							<Image
					  			style={{width:26,height:26}}
					  			source={Banner_Imgs.MAINPAGEVIEW_TOPICON}
								/>
						</TouchableHighlight>
					</Image>

					<View style={{flex: 0.3,flexDirection:'row'}}>

						<TouchableHighlight style = {{flex: 0.25,}} onPress = {() => Alert.alert('Touch MT4')}>
						<View style={{flexDirection:'row',flex: 1,backgroundColor:"#FFFFFF",alignItems:'center'}}>
							<View style={{flex: 0.5,}}>
								<Text>
									chen
								</Text>
								<Text>
									ajskdj
								</Text>
								<Text>
									ggd
								</Text>
							</View>
							
								<Image
							  	style={{width:26,height:26,flex: 0.5,}}
							  	source={Banner_Imgs.MAINPAGEVIEW_TOPICON}
								/>
						</View>
						</TouchableHighlight>
						
						<View style={{flex: 0.25,backgroundColor:"#FFC125"}}>
						</View>
						<View style={{flex: 0.25,backgroundColor:"#EE6AA7"}}>
						</View>
						<View style={{flex: 0.25,backgroundColor:"#8B3A3A"}}>
						</View>
					</View>
			</View>
		);
	}

	//加载页面上数据
	renderData() {
		return (

			<View style={{flex: 1}}>
				<FlatList 
						 ref={(flatList)=>this._flatList = flatList}
						  ListHeaderComponent={this._header}			
						 ItemSeparatorComponent={this._separator}
						 getItemLayout={(item, index) => ( {length: ITEM_HEIGHT, offset: (ITEM_HEIGHT + 4) * index, index} )}
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
			<View style={{flex:1,height:200}}>
				<View style={{flex: 0.2, backgroundColor:'#90EE90', flexDirection:'row', justifyContent:'space-between'}}>
					<Text>{item.item.title}</Text>
					<Text>{item.item.createDate}</Text>
				</View>
				<View style={{flex: 0.8, backgroundColor:'#FFFFFF'}}>
					<Text style = {{flex: 0.7, textAlign:'center',textAlignVertical:'bottom'}}>{item.item.content}</Text>
					<View style={{flex:0.3,flexDirection:'row'}}>
						<Text style = {{flex: 0.5, textAlign:'right',textAlignVertical:'center'}}>晒贴人:{item.item.createrName}</Text>
						<Text style = {{flex: 0.5, textAlign:'left',textAlignVertical:'center'}}>|跟帖数:{item.item.count}</Text>
					</View>
				</View>
				<View style={{flex: 0.2, backgroundColor:'#8B5A2B'}}>
					<TouchableHighlight style = {{flex: 1,}} onPress = {() => navigate('ConsultationViewDetailView',{item:item.item})}>
						<Text style = {{flex:1,textAlign:'center',textAlignVertical:'center'}}>
							跟帖
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
			<View style={{flex:1,height:200}}>
				<View style={{flex: 0.2, backgroundColor:'#90EE90', flexDirection:'row', justifyContent:'space-between'}}>
					<Text>{item.item.title}</Text>
					<Text>{item.item.createDate}</Text>
				</View>
				<View style={{flex: 0.8, backgroundColor:'#8A2BE2'}}>
					<Image
				  		style = {{flex: 1,resizeMode:'stretch'}}
				  		source={{uri:item.item.indexImg}}
					/>
				</View>
				<View style={{flex: 0.2, backgroundColor:'#8B5A2B'}}>
					<TouchableHighlight style = {{flex: 1,}} onPress = {() => navigate('ConsultationViewDetailView',{item:item.item})}>
						<Text style = {{flex:1,textAlign:'center',textAlignVertical:'center'}}>
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
		return <View style={{height:4,backgroundColor:'white'}}/>;
	}


	_createEmptyView() {
		return (
			<Text style={{fontSize: 40, alignSelf: 'center'}}>还没有数据哦！</Text>
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
	static navigationOptions = {
		tabBarLabel: "外汇",

	};
	render() {
		return (
			<Text>ForeignExchangeView</Text>
		);
	}
}

class IntegralIncrementView extends Component {
	static navigationOptions = {
		tabBarLabel: "积分增值",

	};
	render() {
		return (
			<Text>IntegralIncrementView</Text>
		);
	}
}

class ForumView extends Component {
	static navigationOptions = {
		tabBarLabel: "贴吧",

	};
	render() {
		return (
			<Text>ForumView</Text>
		);
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
				return this.drawTieBaView();;
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
		activeTintColor: '#e91e63',
		style: {
			height: 45,
			//backgroundColor: '#ffffff',  
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
		fontSize: 30,
	},
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	title: {
		fontSize: 15,
		color: 'blue',
	},
	content: {
		fontSize: 15,
		color: 'black',
	},
	icon: {
		width: 26,
		height: 26,
	},
});

export {
	TabNavigatorRoot,
	RootTabNavigationBar,
	ConsultationViewDetailView
};