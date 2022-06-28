import { FlatList, Image, StyleSheet, TextInput, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default UserInput = () => {
	return(
		<View style={{
			flexDirection:'row',
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: 15,
			marginHorizontal: 24,
			marginTop: 10
			}}>
			<View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
				<Icon name='attachment' size={30} color='rgba(64, 64, 64, 0.6)' style={{transform: [{rotateZ: '130deg'}]}}/>
			</View>
			<View style={{
				flexDirection: 'row',
				paddingLeft:20,
				alignItems: 'center',
				backgroundColor: 'rgba(64, 64, 64, 0.1)',
				height: 40,
				flex:9,
				borderRadius: 25
			}}>
				<TextInput style={{flex: 8,  fontSize: 16}} selectionColor='rgba(122, 36, 231, 0.6)' placeholder='Напишите сообщение'/>
				<Icon style={{flex:1}} size={25} name='send' color='rgba(64, 64, 64, 0.6)'/>
			</View>
		</View>
	)
}

