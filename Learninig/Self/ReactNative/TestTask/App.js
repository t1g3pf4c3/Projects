import { StatusBar } from 'expo-status-bar';
import React,{ useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage'

import Onboarding from './app/components/Onboarding';
import Login from './app/components/Login'

const Loading = () => {
	return (<View>
		<ActivityIndicator size='large'/>
	</View>
	)}
export default function App() {
	const [loading, setLoading] = useState(true);
	const [viewedOnboarding, setviewedOnboarding] = useState(false);

	// const checkOnboarding = async () => {
	// 	try {
	// 		const value = await AsyncStorage.getItem('@viewedOnboarding')
	// 		if (value !== null) {
	// 			setviewedOnboarding(true);
	// 	}
	// 	} catch (error) {
	// 			console.log('Error @checkOnboarding', error)
	// 	} finally {
	// 			setLoading(false)
	// 	}
	// }

	useEffect(() => {
		checkOnboarding();
	})

  return (
    <View style={styles.container}>
			{loading ? <Loading /> : viewedOnboarding ? <Login /> : <Onboarding />}
			<StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
