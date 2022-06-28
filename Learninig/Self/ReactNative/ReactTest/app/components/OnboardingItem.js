import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, useWindowDimensions } from 'react-native';

export default function OnboardingItem({ item }) {
	const { width } = useWindowDimensions();
  return (
		<View style={[styles.container, {width}]}>
			<Image 
				source={ item.image } 
				style={[styles.image, {width: width*0.7, resizeMode: 'contain'}]}
			/>
			<View style={{flex:0.4}}>
				<Text style={ styles.title }> { item.title } </Text>
				<Text style={ styles.description }> { item.description } </Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		flex: 0.6,
		// flex: 0.6,
		justifyContent: 'center'
	},
	title: {
		marginTop: 48,
		fontWeight: '700',
		paddingHorizontal: 43,
		fontSize: 20,
		color: '#404040',
		textAlign: 'center'
	},
	description: {
		fontWeight: '400',
		fontSize: 20,
		color: '#404040',
		textAlign: 'center',
		paddingHorizontal: 43,
	},
});


