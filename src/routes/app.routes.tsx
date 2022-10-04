import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '@screens/Home';
import { Statistics } from '@screens/Statistics';
import { CreationOrEdition } from '@screens/CreationOrEdition';
import { Feedback } from '@screens/Feedback';
import { MealInfo } from '@screens/MealInfo';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
	return (
		<Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Screen name='home' component={Home} />
			<Screen name='statistics' component={Statistics} />
			<Screen name='creationOrEdition' component={CreationOrEdition} />
			<Screen name='feedback' component={Feedback} />
			<Screen name='meal' component={MealInfo} />
		</Navigator>
	);
}