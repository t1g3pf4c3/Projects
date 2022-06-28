import  Header  from "../components/Header.js"
import CategoryItem from "../components/CategoryItem.js"
import Categories from "../components/Categories"
import Search from "../components/Search.js"
import Restaurants from "../components/Restaurants"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useState } from 'react';

export default function HomeScreen() {
	const [term, setTerm] = useState("Burger")

	const commonCategories = [
		{
			name:"Burger",
			imageUrl: require("../assets/images/burger.png")
		},
		{
			name:"Pasta",
			imageUrl: require("../assets/images/pasta.png")
		},
		{
			name:"Cake",
			imageUrl: require("../assets/images/cake.png")
		},
		{
			name:"Pizza",
			imageUrl: require("../assets/images/pizza.png")
		},
		{
			name:"Steak",
			imageUrl: require("../assets/images/steak.png")
		},
		{
			name:"Cocktails",
			imageUrl: require("../assets/images/smoothies.png")
		},
	]

	return(
			<View style={styles.container}>
			<StatusBar />
			<Header/>
			<Search
				setTerm={setTerm}
			/>
			<View>
			<FlatList
				data={ commonCategories }
				renderItem={({ item, index }) => {
					return (
						<CategoryItem 
							name={item.name} 
							imageUrl={item.imageUrl} 
							index={index}
							active={item.name==term}
							handlePress = {() => setTerm(item.name)}

						/>
					)
				}}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(category) => category.name}
			/>
			</View>
			<Categories	categories={commonCategories} setTerm={setTerm} term={term} />
			<Restaurants term={term}/>

		</View>

	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex:1,
	}
})
