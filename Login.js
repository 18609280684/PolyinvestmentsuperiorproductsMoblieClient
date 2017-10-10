'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  TextInput  
} from 'react-native';

import t from 'tcomb-form-native';
import Spinner from 'react-native-loading-spinner-overlay';
import CookieManager  from 'react-native-cookies';


var Form = t.form.Form;
var Person = t.struct({
	用户名:t.String,
	密码:t.Number,
});
var options = {};

var PersonRegister = t.struct({
  用户名:t.String,
  密码:t.Number,
});
var optionsRegister = {};

//登录页面
class Login extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	visible: false,
	  };
	}

	static navigationOptions = ({
		navigation
	}) => ({
		// header: false,
	});

	_onPress(){
		 var value = this.refs.form.getValue();
		 const {
			navigation
		} = this.props;
		  // Alert.alert('tttttttttt:' + value);
    	if (value) { // if validation fails, value will be null
    		this.setState({
    			visible:true,
    		});
    		// console.log('value.userName:' + value.userName);
    		// console.log('value.password:' + value.password);
    		this.fetchLoginData(value,navigation);
    	}else
    	{
    		Alert.alert('用户名或密码格式不对！请重新输入');
    	}
	}

	fetchLoginData(value,navigation){
		//Alert.alert('开始请求数据');
		fetch(
			'http://47.94.157.124:8080/customer/login',{
				method:'POST',
				headers:{
					 'Content-Type': 'application/x-www-form-urlencoded',
				},
				body:'customerCode=' + value.用户名 + '&' + 'password=' + value.密码
			})
		.then((response) => response.json())
		.then((responseJson) => {
			this.setState({
				visible:false,
			});
			console.log(responseJson);
			if (responseJson.success) {
				Alert.alert('登录成功！');


  //       CookieManager.setFromResponse('http://bing.com/', 
  // 'user_session=abcdefg; path=/; expires=Thu, 1 Jan 2030 00:00:00 -0000; secure; HttpOnly')
  //   .then((res) => {
  //     // `res` will be true or false depending on success.
  //     console.log('CookieManager.setFromResponse =>', res);
  //   });

  //       CookieManager.get('http://bing.com/')
  //       .then((res) => {
  //           console.log('CookieManager.get =>', res); // => 'user_session=abcdefg; path=/;'
  //       });

				navigation.goBack();
			}else
			{
				Alert.alert('登录失败！');
			}
		})
		.catch((error) => {
			console.error(error);
			Alert.alert(error);
		});
	}

  render() {
    const{navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
      <Spinner visible = {this.state.visible} textContent = {'Loading...'} textStyle = {{color: '#FFF'}}/>

      <Form
      	ref = "form"
      	type = {Person}
      	options = {options}
      	/>
      	<TouchableHighlight style = {styles.button} onPress = {this._onPress.bind(this)} underlayColor = '#99d9f4'>
      		<Text style={styles.buttonText}>
      			提交
      		</Text>
      	</TouchableHighlight>
        <View  style = {{ flexDirection:'row',justifyContent:'space-between'}}>
            <Text onPress = {() => navigate('RegisterView')}>注册</Text>
            <Text onPress = {() => navigate('ForgetPasswordView')}>忘记密码</Text>
          </View>
      </View>
    );
  }
}

//忘记密码页面
class ForgetPasswordView extends Component{
  render() {
    return (
      <View >
        <Text>ForgetPasswordView</Text>
      </View>
    );
  }
}

//注册页面
class RegisterView extends Component{
  constructor(props) {
    super(props);
  
    this.state = { text: '请输入验证码' };
  }
  
  _onPress(){

  }  

  _onCodePress(){

  }

  render() {
    return (
      <View style={styles.container}>
      <Spinner visible = {this.state.visible} textContent = {'Loading...'} textStyle = {{color: '#FFF'}}/>

      <Form
        ref = "form"
        type = {PersonRegister}
        options = {optionsRegister}
        />
        <View  style = {{ flexDirection:'row',justifyContent:'space-between'}}>
            <TextInput
              style={{height: 40, width:250,borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />

            <TouchableHighlight style = {styles.button} onPress = {this._onCodePress.bind(this)} underlayColor = '#99d9f4'>
              <Text style={styles.buttonText}>
                获取验证码
              </Text>
            </TouchableHighlight>
          </View>
        <TouchableHighlight style = {styles.button} onPress = {this._onPress.bind(this)} underlayColor = '#99d9f4'>
          <Text style={styles.buttonText}>
            提交注册
          </Text>
        </TouchableHighlight>
      </View>
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


export  {Login,RegisterView,ForgetPasswordView};