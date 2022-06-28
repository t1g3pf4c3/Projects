import { FlatList, StyleSheet, Text, View, ActivityIndicator } from "react-native"
import useRestaurants from "../hooks/useRestaurants"
import {useEffect} from "react"
import RestaurantItem from "./RestaurantItem"

export default function Restaurants({term}) {
	const [{data, loading, error}, searchRestaurants] = useRestaurants();

	useEffect(() => {
		searchRestaurants(term);
	}, [term])

	if (loading) return <ActivityIndicator size="large" marginVertical={ 30 }/>
	if (error) return (
		<View style={styles.container}>
			<Text style={styles.header}>{error}</Text>
		</View>

	)

	return (
<View>
			<Text style={styles.header}>Top Restaurants</Text>
		<View style={styles.container}>
			<FlatList 
	
				data={data}
				showsVerticalScrollIndicator={false}
				keyExtractor={(restaurant) => restaurant.id}
				renderItem={({item}) => (
				<RestaurantItem restaurant={item}/>
				// <Text> {item.name} </Text>
				)}
			/>
		</View></View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 25,
		marginVertical: 15,
		borderRadius: 50,
	},
	header: {
		fontWeight: "bold",
		fontSize: 20,
		paddingBottom: 10,
		marginHorizontal: 25,
	},

})
