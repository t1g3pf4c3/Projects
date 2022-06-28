
import HomeScreen from "./src/screens/HomeScreen"
import RestaurantScreen from "./src/screens/RestaurantScreen"
import { createStackNavigator } from "react-navigation-stack"
import { createAppContainer } from "react-navigation"
// import 'react-native-gesture-handler';

const navigator = createStackNavigator(
	{
	Home: HomeScreen,
	Restaurant: RestaurantScreen,
	},
	{
		initialRouteName: "Home",
		defaultNavigationOptions: {
			title: "BuisnessSearch"
		}

})

export default createAppContainer(navigator);
