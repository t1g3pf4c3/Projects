import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, FlatList, Animated } from 'react-native';
import Svg, { SvgUri } from 'react-native-svg'

import OnboardingItem from '../components/OnboardingItem'
import Paginator from '../components/Paginator'
import OnboardingNextButton from '../components/OnboardingNextButton'

import Logo from '../assets/images/icons/Logo.svg'

import slides from '../constants/slides'

export default function Onboarding() {
	const topIcon = require('../assets/images/icons/VectorMainIcon.png')
	const [currenIndex, setCurrentIndex] = useState(0);
	const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null); 


	const viewableItemsChanged = useRef(({ viewableItems }) => {
			setCurrentIndex( viewableItems[0].index );
		}).current;
	
	const viewConfig = useRef({ viewAreaCoveragePercentTreshold: 50 }).current;
	
	const scrollTo = async () => {
		// if (currenIndex < slides.length-1) {
		// 	slidesRef.current.scrollToIndex({ index: currenIndex +1});
		// }
		// else {
		// 	try {
		// 		await AsyncStorage.setItem('@viewedOnboarding', 'true')
		// 	} catch (error) {
		// 		console.log('Err @setItem', error)
		// 	}	
		// }
	}
	return (
		<View style={ styles.container }>
			<Logo style={
					{
						alignSelf:'flex-start',
						marginLeft:24,
					
					}
				}
				/>
			<View style={{flex:4}} >
				<FlatList 
					data={ slides } 
					renderItem={ ({ item }) => {
						return(
							<OnboardingItem item={ item }/>
						)
					}} 
					horizontal
					pagingEnabled
					bounces={ false }
					keyExtractor={ ( item ) => item.id }
					showsHorizontalScrollIndicator={ false }
					onScroll={ Animated.event([{ nativeEvent: { contentOffset: { x: scrollX }}}],{
						useNativeDriver: false,
					})}
					scrollEventThrottle={ 32 }
					onViewableItemsChanged={ viewableItemsChanged }
					ref={ slidesRef }
					/>
			</View>
			<View style={{flex: 1, alignItems: 'center'}}>
				<Paginator data={ slides } style={{marginBottom: 130}} scrollX={scrollX}/>
				<OnboardingNextButton scrollTo={scrollTo}/>
			</View>
				

		</View>
	);
}

const styles = StyleSheet.create({
  container: {
		marginTop: 44,
		marginBottom: 34,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

