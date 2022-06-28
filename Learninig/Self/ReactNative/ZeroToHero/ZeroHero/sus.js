import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

export default function Sus() {
	const [sus, setSus] = useState("sUs");

	return(
		<View>
			<Text>{sus}</Text>
		</View>
	)
}
