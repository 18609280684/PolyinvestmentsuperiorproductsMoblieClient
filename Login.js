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
  Image
} from 'react-native';
import Cookie from 'react-native-cookie';
import t from 'tcomb-form-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  RequestUrl,
  Banner_Imgs,
} from './Public/Constants.js';
import {
  scaleSize,
  setSpText,
  deviceWidth
} from './Public/ScreenAdaptationUtil.js';



var Form = t.form.Form;
var Person = t.struct({
  用户名: t.String,
  密码: t.Number,
});
var options = {};

var PersonRegister = t.struct({
  用户名: t.String,
  密码: t.Number,
});
var optionsRegister = {};

var PersonForgetPassword = t.struct({
  用户名: t.String,
  新密码: t.Number,
});
var optionsForgetPassword = {};

//登录页面
class Login extends Component {
  constructor(props) {
    super(props);
    Cookie.set('http://bing.com/', 'foo', 'bar').then(() => console.log('success'));
    this.state = {
      visible: false,
    };
  }

  static navigationOptions = ({
    navigation
  }) => ({
    // header: false,
  });

  _onPress() {
    var value = this.refs.form.getValue();
    const {
      navigation
    } = this.props;
    if (value) { // if validation fails, value will be null
      this.setState({
        visible: true,
        name:'',
        password:'',
      });
      // console.log('value.userName:' + value.userName);
      // console.log('value.password:' + value.password);
      this.fetchLoginData(value, navigation);
    } else {
      Alert.alert('用户名或密码格式不对！请重新输入');
    }
  }

  fetchLoginData(value, navigation) {
    //Alert.alert('开始请求数据');
    fetch(
        RequestUrl.LOGIN_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'customerCode=' + value.用户名 + '&' + 'password=' + value.密码
        })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          visible: false,
        });
        console.log(responseJson);
        if (responseJson.success) {
          Alert.alert('登录成功！');

          navigation.goBack();
        } else {
          Alert.alert('登录失败！');
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(error);
      });
  }

  render() {
    Cookie.get('http://bing.com/', 'foo').then((cookie) => console.log(cookie));
    // const {
    //   navigate
    // } = this.props.navigation;
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

            <View style={{flexDirection:'row',marginBottom:scaleSize(30)}}>
                <TouchableHighlight onPress = {() => Alert.alert()}>
                    <Text style={{fontSize:setSpText(13),color:'rgb(156,154,143)'}}>注册用户</Text>
                </TouchableHighlight>
                  <View style={{width:scaleSize(200)}}>
                  </View>
                <TouchableHighlight onPress = {() => Alert.alert()}>
                    <Text style={{fontSize:setSpText(13),color:'rgb(156,154,143)'}}>
                      忘记密码
                    </Text>
                </TouchableHighlight>
            </View>

            <TouchableHighlight
              onPress={() => Alert.alert('提交')}>
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
              <TouchableHighlight onPress = {() => Alert.alert('')}>
                <Image
                  style={{height:scaleSize(78),width:scaleSize(78)}}
                  source={Banner_Imgs.LOGINPAGE_WIXIN}
                />
              </TouchableHighlight>
          </View>
       </View>
      </Image>
    );
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

  render() {
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
}

//注册页面
class RegisterView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name:'',
      password:'',
      yanzhenma:'',
    };
  }

  _onPress() {

  }

  _onCodePress() {

  }

  render() {
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