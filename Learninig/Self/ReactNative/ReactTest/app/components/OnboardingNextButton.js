import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg'

// import { Container } from './styles';

export default function OnboardingNextButton({scrollTo}) {
	const { width } = useWindowDimensions();

  return (
		<View> 
			<TouchableOpacity
				onPress={scrollTo}
				style={[styles.button, {width: width-48}]}>
				<Text style={styles.text}> Далее </Text>
			</TouchableOpacity>
		</View>

  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		backgroundColor: '#7A24E7',
		borderRadius: 25,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		color: '#FFFFFF',
		fontSize: 24,
		fontWeight: '700',
	}
});

