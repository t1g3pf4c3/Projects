import React from 'react';
import { View, StyleSheet, Animated, useWindowDimensions} from 'react-native';

export default function Paginator({ data, scrollX}) {
	const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
			{data.map((_, i) => {
			const inputRange = [(i-1) * width, i * width, (i+1) * width];

			const dotWidth = scrollX.interpolate({
				inputRange,
				outputRange: [10, 30, 10],
				extrapolate: 'clamp',
			})

			const opacity = scrollX.interpolate({
				inputRange,
				outputRange: [0.2, 1, 0.2],
				extrapolate: 'clamp',
			})
			const color = scrollX.interpolate({
				inputRange,
				outputRange: ['rgb(64, 64, 64)', 'rgb(255,108,25)', 'rgb(64, 64, 64)'],
				extrapolate: 'clamp',
			})
			
			return(
						<Animated.View
							fill="black"
							style={[
								styles.dot,
								{
									width: dotWidth,
									opacity: opacity,
									backgroundColor: color,
							}
							]}
							key={i.toString()}
						/>
				)
			})}
		</View>
  );
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	dot: {
		height: 10,
		borderRadius: 5,
		marginHorizontal: 6,
		// backgroundColor: 'hsl(22, 100, 55)'
	}
});
