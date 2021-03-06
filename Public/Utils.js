	'use strict';
	
	import React, { Component } from 'react';
	
	import {
	  StyleSheet,
	  View,
	  ActivityIndicator,
	  Text,
	} from 'react-native';
	import Toast from 'react-native-root-toast';
	
	class Utils extends Component {
	  render() {
	    return (
	      <View />
	    );
	  }
	}
	
	//加载等待的view 
export function renderLoadingView() { 
			return ( 
			<View style={styles.container}> 
			<ActivityIndicator animating={true} style={[styles.gray, {height: 80}]} color='red' size="large" /> 
			</View> 
			); 
		}

	 //加载失败view 
export function	renderErrorView(error) { 
	 		return ( 
	 		<View style={styles.container}> 
	 		<Text> 
	 		Fail: {error} 
	 		</Text> 
	 		</View> 
	 		);
	 	}

export function ToastShow(toastShowString,showTime) {
	var time = '';
	switch (showTime){
			case 1:
				time = Toast.durations.SHORT;
				break;
			case 2:
				time = Toast.durations.LONG;
				break;
			default:
				time = '';
		}
	return(
		Toast.show(toastShowString, {
			duration: time,
			position: Toast.positions.CENTER,
			shadow: true,
			animation: true,
			hideOnPress: true,
			delay: 0,
			onShow: () => {
				// calls on toast\`s appear animation start
			},
			onShown: () => {
				// calls on toast\`s appear animation end.
			},
			onHide: () => {
				// calls on toast\`s hide animation start.
			},
			onHidden: () => {
				// calls on toast\`s hide animation end.
			}
		})
	);
}

const styles = StyleSheet.create({
	container: { 
    	flex: 1,
    	flexDirection: 'row', 
    	justifyContent: 'center', 
    	alignItems: 'center', 
    	backgroundColor: '#F5FCFF', 
    }, 
	});