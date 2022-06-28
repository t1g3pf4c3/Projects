import  {View, TextInput,Text, StyleSheet} from "react-native"
import { useState } from 'react';
import { FontAwesome } from "@expo/vector-icons"
import { elevation } from "../common/styles.js"
export default function Search({setTerm}) {
	const [input, setInput] = useState("");

	const handleEndEditing = () => {
		if(!input) return;
		setTerm(input);
		setInput("");
	}
	return (
		<View style={[styles.container, styles.elevation]}>
			<FontAwesome name="search" size={25}/>
			<TextInput 
				style={styles.input} 
				placeholder="Restaraunts, food"
				value={input}
				onChangeText={(text) => {
						setInput(text);
					}}
				onEndEditing={handleEndEditing}
			/>
		</View>
	)
}

const styles = new StyleSheet.create({
	container: {
		flexDirection: "row",
		marginTop: 5,
		marginHorizontal: 25,
		backgroundColor: "white",
		borderRadius:25,
		padding: 15,
	},
	elevation,
	input: {
		marginLeft: 10,
		fontSize: 20,
	}
	
	 
});
