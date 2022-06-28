import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from "react-native";
import { back } from "react-native/Libraries/Animated/Easing";
import { elevation } from "../common/styles.js"

export default function CategoryItem({ name , imageUrl, index, active, handlePress}) {
	return (
		<TouchableOpacity onPress={handlePress}>
			<View style={[styles.container, styles.elevation,
				active 
				? { backgroundColor : "rgb(241,186,87)" }
				: { backgroundColor : "white"},
				index === 0 ? {marginLeft: 25} : {marginLeft: 15}]}
				>
				<View style={styles.imageContainer}>
					<Image 
						source={imageUrl} 
						style={styles.image} 
					/>
				</View>
				<Text style={styles.header}>{ name }</Text>
			</View>

		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
	container: {
		width: 70,
		marginLeft: 20,
		height: 100,
		borderRadius: 50,
		marginVertical: 15,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center"
	},
	elevation,
	image: {
		width: 35,
		height: 35
	},
	imageContainer: {
		width: 50,
		height: 50,
		backgroundColor: "white",
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		fontSize: 15,
		fontWeight: "bold",
	}
})
