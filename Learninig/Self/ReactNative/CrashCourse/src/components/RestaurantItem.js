import { Text, View, Image, StyleSheet, TouchableOpacity} from "react-native"
import { withNavigation } from "react-navigation"
import {elevation} from "../common/styles"

function RestaurantItem ({restaurant, navigation}) {
	console.log(restaurant)
	return (

		<TouchableOpacity
			onPress={() => navigation.navigate("Restaurant", {id: restaurant.id})}>
			<View style={[styles.elevation, styles.container]}>
				<Image style={styles.image} source={{uri: restaurant.image_url}}/>
				<View style={styles.infoContainer}>
					<Text style={styles.header}> {restaurant.name}</Text>
					<View style={styles.info}>
						<Text style={styles.rating}>{restaurant.rating}</Text>
						<Text style={styles.money}>{restaurant.price}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 100,
		alignSelf: "stretch",
		flexDirection: "row",
		marginVertical: 10,
		backgroundColor: "white",
		borderRadius: 50,
		alignItems: "center", 
	},
	elevation,
	image: {
		width: 75,
		height: 75,
		borderRadius: 50,
		marginLeft: 8,
	},
	header: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 4,
	},
	infoContainer: {
		flex: 1,
		paddingHorizontal: 10,
	},
	info: {
		flexDirection: "row",
		marginLeft: 4,
	},
	rating: {
		marginRight: 20,
	},
	money: {
		color: "gold"
	}


})

export default withNavigation(RestaurantItem);
