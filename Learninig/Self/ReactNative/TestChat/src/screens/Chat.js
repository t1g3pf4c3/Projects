import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import ChatMessage from '../components/ChatMessage'
import UserInput from '../components/UserInput';

export default Chat = ({currUid, messages}) => {
		return(
		<View style={styles.container}>
			<View style={styles.Chat}>
				<FlatList
					style={{padding:24}}
					data = {messages}
					inverted={true}
					keyExtractor = {(message) => message.id}
					renderItem={({item}) => (
					<ChatMessage text={item.text} currUid={currUid} uid={item.uid} uname={item.uname} avatar={item.avatar}/>
					)}
				/>
			</View>
			<UserInput/>
		</View>
	);
}



const styles = StyleSheet.create({
	Chat: {
		flex:1,
		alignItems:'stretch',
		justifyContent: 'space-between'
	},
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
