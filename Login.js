'use strict';

import React, {
  Component
} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  TextInput,
  Image,
  ScrollView
} from 'react-native';
import Cookie from 'react-native-cookie';
import t from 'tcomb-form-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  RequestUrl,
  Banner_Imgs,
  Constants
} from './Public/Constants.js';
import {
  renderLoadingView,
  renderErrorView,
  ToastShow
} from './Public/Utils.js';
import {
  scaleSize,
  setSpText,
  deviceWidth,
  deviceHeight
} from './Public/ScreenAdaptationUtil.js';
import *as wechat from 'react-native-wechat';



// var Form = t.form.Form;
// var Person = t.struct({
//   用户名: t.String,
//   密码: t.Number,
// });
// var options = {};

// var PersonRegister = t.struct({
//   用户名: t.String,
//   密码: t.Number,
// });
// var optionsRegister = {};

// var PersonForgetPassword = t.struct({
//   用户名: t.String,
//   新密码: t.Number,
// });
// var optionsForgetPassword = {};

//登录页面
class Login extends Component {
  constructor(props) {
    super(props);
    this.name = '';
    this.password = '';
    this.state = {
      isLoading: false,
      error: false,
      errorInfo: "",
    };
  }

  static navigationOptions = ({
    navigation
  }) => ({
    // header: false,
  });

  _onPress() {
    if (this.name != ''  && this.name != null && this.password != null && this.password != '') {
        this.setState({
          isLoading:true,
        });
        this.fetchLoginData();
    }else
    {
       ToastShow('用户名或密码不能为空',Constants.TOAST_SHORT);
    }
  }

  fetchLoginData() {
    //Alert.alert('开始请求数据');
    const{navigation} = this.props;
    fetch(
        RequestUrl.LOGIN_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'customerCode=' + this.name + '&' + 'password=' + this.password
        })
      .then((response) => response.json())
      .then((responseJson) => {
        this.name = '';
        this.password = '';
        this.setState({
          isLoading: false,
        });
        console.log(responseJson);
        if (responseJson.success) {
          // Cookie.clear();
          Cookie.set(RequestUrl.LOGIN_URL, 'customerId',responseJson.message.customerId).then(() => console.log('customerId'));
          Cookie.set(RequestUrl.LOGIN_URL, 'customerName',responseJson.message.customerName).then(() => console.log('customerName'));
          Cookie.set(RequestUrl.LOGIN_URL, 'customerCode',responseJson.message.customerCode).then(() => console.log('customerCode'));
          Cookie.set(RequestUrl.LOGIN_URL, 'createDate',responseJson.message.createDate).then(() => console.log('createDate'));
          Cookie.set(RequestUrl.LOGIN_URL, 'integral',responseJson.message.integral).then(() => console.log('integral'));
          Cookie.set(RequestUrl.LOGIN_URL, 'dateBirth',responseJson.message.dateBirth).then(() => console.log('dateBirth'));
          Cookie.set(RequestUrl.LOGIN_URL, 'sex',responseJson.message.sex).then(() => console.log('sex'));
          Cookie.set(RequestUrl.LOGIN_URL, 'telephone',responseJson.message.telephone).then(() => console.log('telephone'));
          Cookie.set(RequestUrl.LOGIN_URL, 'email',responseJson.message.email).then(() => console.log('email'));
          Cookie.set(RequestUrl.LOGIN_URL, 'autograph',responseJson.message.explain).then(() => console.log('autograph'));
          Cookie.set(RequestUrl.LOGIN_URL, 'pinCode',responseJson.message.explain).then(() => console.log('pinCode'));
          Cookie.set(RequestUrl.LOGIN_URL, 'bankCardNumber',responseJson.message.explain).then(() => console.log('bankCardNumber'));

          ToastShow('登录成功！',Constants.TOAST_SHORT);
           navigation.navigate('Home');
        } else {
          ToastShow('登录失败,账户名或密码不对！',Constants.TOAST_SHORT);
        }
      })
      .catch((error) => {
        ToastShow(error,Constants.TOAST_SHORT);
        console.error(error);
        Alert.alert(error);
        this.setState({
          error: true,
          errorInfo: error,
        });
      });
  }

  renderData(){
    const{navigate} = this.props.navigation;
    var _scrollView: ScrollView;
    return(
      <ScrollView
        ref={(scrollView) => { _scrollView = scrollView; }}
        automaticallyAdjustContentInsets={true}
        onScroll={() => { console.log('onScroll!'); }}
        style = {{height:deviceHeight}}
        >
        <Image style = {{flex: 1,height:deviceHeight,width:deviceWidth,backgroundColor:'rgba(0,0,0,0)'}}
        source = {Banner_Imgs.LOGINPAGE_BG}>
       <View style={{flex: 1,}}>
      
          <View style={{flex: 0.3,justifyContent:'center',alignItems:'center',marginTop:scaleSize(150)}}>
            <Image
              style={{height:scaleSize(224),width:scaleSize(187),}}
              source={Banner_Imgs.LOGINPAGE_LOGO}
            />
          </View>

          <View style={{flex: 0.4,justifyContent:'space-around',alignItems:'center',marginTop:scaleSize(100)}}>
            <Image
              style={{height:scaleSize(80),width:scaleSize(485)}}
              source={Banner_Imgs.LOGINPAGE_ZHANGHAO}>
              <TextInput  style={{marginLeft:scaleSize(70),width:scaleSize(360),fontSize:setSpText(11),color:'#F3D671'}}  
                onChangeText={(text) => this.name = text} 
                placeholder = "手机号码/用户名" 
                placeholderTextColor  = 'gray'
                secureTextEntry  = {false}
                underlineColorAndroid = 'transparent'
                
              />
            </Image>  

        
            <Image
              style={{height:scaleSize(80),width:scaleSize(485)}}
              source={Banner_Imgs.LOGINPAGE_MIMA}>
              <TextInput  style={{marginLeft:scaleSize(70),width:scaleSize(360),fontSize:setSpText(11),color:'#F3D671'}}  
                onChangeText={(text) => {
                  this.password = text;
                  
                }} 
                placeholder = "密码" 
                placeholderTextColor  = 'gray'
              secureTextEntry  = {true}
              underlineColorAndroid = 'transparent'

              />
            </Image> 

            <View style={{flexDirection:'row',marginBottom:scaleSize(30)}}>
                <TouchableHighlight onPress = {() => navigate('RegisterView')}>
                    <Text style={{fontSize:setSpText(13),color:'rgb(156,154,143)'}}>注册用户</Text>
                </TouchableHighlight>
                  <View style={{width:scaleSize(200)}}>
                  </View>
                <TouchableHighlight onPress = {() => Alert.alert('请联系客服确认身份后修改密码')}>
                    <Text style={{fontSize:setSpText(13),color:'rgb(156,154,143)'}}>
                      忘记密码
                    </Text>
                </TouchableHighlight>
            </View>

            <TouchableHighlight
              onPress={() => this._onPress()}>
                <Image
                  style={{height:scaleSize(72),width:scaleSize(420)}}
                  source={Banner_Imgs.LOGINPAGE_BUTTON}
                />
            </TouchableHighlight>
          </View>
          <View style={{flex: 0.3,alignItems:'center',justifyContent:'flex-end',marginBottom:scaleSize(150)}}>
          <Text></Text>
              <Image
                style={{height:scaleSize(30),width:scaleSize(650),marginBottom:scaleSize(50)}}
                source={Banner_Imgs.LOGINPAGE_WIXINFENGE}
              />
              <TouchableHighlight onPress = {() => {
                wechat.isWXAppInstalled()
                .then((isInstalled) => {
                  if (isInstalled) {
                    ToastShow('微信已经安装!',Constants.TOAST_SHORT);
                    wechat.sendAuthRequest('snsapi_userinfo', 'wechat_sdk_demo')
                      .then((responseCode) => {

                      })
                      .catch((err) => {
                        ToastShow('登录授权发生错误：' + err.message,Constants.TOAST_SHORT);
                      });
                  }else{
                    ToastShow('微信未安装，请安装微信！',Constants.TOAST_SHORT);
                  }
                });
              }}>
                <Image
                  style={{height:scaleSize(78),width:scaleSize(78)}}
                  source={Banner_Imgs.LOGINPAGE_WIXIN}
                />
              </TouchableHighlight>
          </View>
       </View>
      </Image>
      </ScrollView>
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

//忘记密码页面
class ForgetPasswordView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '请输入验证码'
    };
  }

  _onPress() {

  }

  _onCodePress() {

  }

  renderData(){
    return (
      <Image style = {{flex: 1,height:null,width:null,backgroundColor:'rgba(0,0,0,0)'}}
        source = {Banner_Imgs.LOGINPAGE_BG}>
       <View style={{flex: 1,}}>
      
          <View style={{flex: 0.3,justifyContent:'center',alignItems:'center',marginTop:scaleSize(150)}}>
            <Image
              style={{height:scaleSize(224),width:scaleSize(187),}}
              source={Banner_Imgs.LOGINPAGE_LOGO}
            />
          </View>

          <View style={{flex: 0.4,justifyContent:'space-around',alignItems:'center',marginTop:scaleSize(100)}}>
            <Image
              style={{height:scaleSize(70),width:scaleSize(430)}}
              source={Banner_Imgs.LOGINPAGE_ZHANGHAO}>
              <TextInput  style={{marginLeft:scaleSize(70),width:scaleSize(360),fontSize:setSpText(11),color:'#F3D671'}}  
                onChangeText={(text) => this.setState({
                      name:Text,
                })} 
                placeholder = "手机号码/用户名" 
                placeholderTextColor  = 'gray'
              secureTextEntry  = {false}
              underlineColorAndroid = 'transparent'
              
              />
            </Image>  

        
            <Image
              style={{height:scaleSize(70),width:scaleSize(430)}}
              source={Banner_Imgs.LOGINPAGE_MIMA}>
              <TextInput  style={{marginLeft:scaleSize(70),width:scaleSize(360),fontSize:setSpText(11),color:'#F3D671'}}  
                onChangeText={(text) => this.setState({
                      password:Text,
                })} 
                placeholder = "密码" 
                placeholderTextColor  = 'gray'
              secureTextEntry  = {true}
              underlineColorAndroid = 'transparent'
              />
            </Image> 

            <View style={{flexDirection:'row',}}>
               
                   <TextInput  style={{width:scaleSize(250),height:scaleSize(70),fontSize:setSpText(11),}}  
                       onChangeText={(text) => this.setState({
                          yanzhenma:Text,
                        })} 
                        placeholder = "验证码" 
                        placeholderTextColor  = 'gray'
                        secureTextEntry  = {false}
                            
                    />
                
                <TouchableHighlight onPress = {() => Alert.alert('获取验证码')} style = {{marginTop:scaleSize(15)}}>
                    <Text style={{height:scaleSize(70),fontSize:setSpText(13),color:'#E8DDCB',}}>
                      获取验证码
                    </Text>
                </TouchableHighlight>
            </View>

            <TouchableHighlight
              onPress={() => Alert.alert('提交注册')}>
                <Image
                  style={{height:scaleSize(72),width:scaleSize(420)}}
                  source={Banner_Imgs.ZHUCEPAGE_BUTTON}
                />
            </TouchableHighlight>
          </View>
          <View style={{flex: 0.3,alignItems:'center',justifyContent:'flex-end',marginBottom:scaleSize(150)}}>
          </View>
       </View>
      </Image>
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

//注册页面
class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.Username = '';
    this.password = '';
    this.yanzhenma = '';
    this.state = {
      isLoading: false,
      error: false,
      errorInfo: "",
    };
  }

    _onPress() {
      console.log('this.Username:' +this.Username);
    if (this.Username != ''  && this.Username != null && this.password != null && this.password != '' ) {
        this.setState({
          isLoading:true,
        });
        this.fetchLoginData();
    }else
    {
       ToastShow('用户名或密码不能为空',Constants.TOAST_SHORT);
    }
  }

  fetchLoginData() {
     const{navigate} = this.props.navigation;
    fetch(
        RequestUrl.REGISTER_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'customerCode=' + this.Username + '&' + 'password=' + this.password
        })
      .then((response) => response.json())
      .then((responseJson) => {
        this.Username = '';
        this.password = '';
        this.yanzhenma = '';
        this.setState({
          isLoading: false,
        });
        console.log(responseJson);
        if (responseJson.success) {
           navigate('Login');
          ToastShow('注册成功！',Constants.TOAST_SHORT);
        } else {
          ToastShow('注册失败,账户名或密码不对！',Constants.TOAST_SHORT);
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
  }

  _onCodePress() {

  }

  renderData(){
    var _scrollView: ScrollView;
    return (
    <ScrollView
        ref={(scrollView) => { _scrollView = scrollView; }}
        automaticallyAdjustContentInsets={true}
        onScroll={() => { console.log('onScroll!'); }}
        style = {{height:deviceHeight}}
        >

      <Image style = {{flex: 1,height:deviceHeight,width:null,backgroundColor:'rgba(0,0,0,0)'}}
        source = {Banner_Imgs.LOGINPAGE_BG}>
       <View style={{flex: 1,}}>
      
          <View style={{flex: 0.3,justifyContent:'center',alignItems:'center',marginTop:scaleSize(150)}}>
            <Image
              style={{height:scaleSize(224),width:scaleSize(187),}}
              source={Banner_Imgs.LOGINPAGE_LOGO}
            />
          </View>

          <View style={{flex: 0.4,justifyContent:'space-around',alignItems:'center',marginTop:scaleSize(100)}}>
            <Image
              style={{height:scaleSize(80),width:scaleSize(485)}}
              source={Banner_Imgs.LOGINPAGE_ZHANGHAO}>
              <TextInput  style={{marginLeft:scaleSize(70),width:scaleSize(360),fontSize:setSpText(11),color:'#F3D671'}}  
                onChangeText={(text) => this.Username = text} 
                placeholder = "手机号码/用户名" 
                placeholderTextColor  = 'gray'
              secureTextEntry  = {false}
              underlineColorAndroid = 'transparent'
              
              />
            </Image>  

        
            <Image
              style={{height:scaleSize(80),width:scaleSize(485)}}
              source={Banner_Imgs.LOGINPAGE_MIMA}>
              <TextInput  style={{marginLeft:scaleSize(70),width:scaleSize(360),fontSize:setSpText(11),color:'#F3D671'}}  
                onChangeText={(text) => this.password = text} 
                placeholder = "密码" 
                placeholderTextColor  = 'gray'
              secureTextEntry  = {true}
              underlineColorAndroid = 'transparent'
              />
            </Image> 

            <View style={{flexDirection:'row',}}>
               
                   <TextInput  style={{width:scaleSize(250),height:scaleSize(80),fontSize:setSpText(11),}}  
                       onChangeText={(text) => this.yanzhenma = text} 
                        placeholder = "验证码" 
                        placeholderTextColor  = 'gray'
                        secureTextEntry  = {false}
                            
                    />
                
                <TouchableHighlight onPress = {() => Alert.alert('获取验证码')} style = {{marginTop:scaleSize(15)}}>
                    <Text style={{height:scaleSize(70),fontSize:setSpText(13),color:'#E8DDCB',}}>
                      获取验证码
                    </Text>
                </TouchableHighlight>
            </View>

            <TouchableHighlight
              onPress={() => this._onPress()}>
                <Image
                  style={{height:scaleSize(72),width:scaleSize(420)}}
                  source={Banner_Imgs.ZHUCEPAGE_BUTTON}
                />
            </TouchableHighlight>
          </View>
          <View style={{flex: 0.3,alignItems:'center',justifyContent:'flex-end',marginBottom:scaleSize(150)}}>
          </View>
       </View>
      </Image>
      </ScrollView>
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

const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});


export {
  Login,
  RegisterView,
  ForgetPasswordView
};