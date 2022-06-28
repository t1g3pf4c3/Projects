import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default ChatMessage = ({currUid, text, uid, uname, avatar}) => {
	
	if (currUid===uid) {
		return(
		<View style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
			<Text>{uname}</Text>
				<View style={[styles.messageContainer, {backgroundColor: '#7A24E7'}]}>
					<Text style={{fontSize: 16, color:'white'}}>{text}</Text>
				</View>
		</View>
	);

	}
	else return(
		<View style={{flexDirection:'row'}}>
			<View style={{alignSelf: 'flex-end', marginRight: 8, paddingBottom: 4}}>
				<Image style={{alignSelf:'auto'}} source={avatar}/>
			</View>
			<View>
				<Text>{uname}</Text>
				<View style={styles.messageContainer}>
					<Image/>
					<Text style={{fontSize: 16}}>{text}</Text>
				</View>
			</View>
		</View>
	);
}


const styles = StyleSheet.create({
	messageContainer: {
		flex:1,
		backgroundColor: 'rgba(64, 64, 64, 0.1)',
		borderRadius: 15,
		padding: 10,
		maxWidth: '80%',
		minHeight: 25,
		marginVertical: 4,
		
	}
});
