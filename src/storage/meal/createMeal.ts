import AsyncStorage from '@react-native-async-storage/async-storage';
import { MEAL_COLLECTION } from '../storageConfig';
import { MealStorageDTO } from './MealStorageDTO';
import { getAllMealsByDate } from './getAllMealsByDate';
import { AppError } from '@utils/AppError';

function orderMeals(a: MealStorageDTO, b: MealStorageDTO) {
	const [previousHour, previousMinute] = a.time.split(':').map(Number);
	const [nextHour, nextMinute] = b.time.split(':').map(Number);

	const previousTimeInMinutes = previousHour * 60 + previousMinute;
	const nextTimeInMinutes = nextHour * 60 + nextMinute;

	if (previousTimeInMinutes < nextTimeInMinutes) {
		return 1;
	}
	if (previousTimeInMinutes > nextTimeInMinutes) {
		return -1;
	}
	return 0;
}

export async function createMeal(newMeal: MealStorageDTO) {
	try {
		// await AsyncStorage.removeItem(`${MEAL_COLLECTION}-${newMeal.date}`);
		const { date } = newMeal;
		const dayMeals = await getAllMealsByDate(date);

		const timeAlreadyRegistered = dayMeals.find(
			meal => meal.time === newMeal.time
		);

		if (timeAlreadyRegistered) {
			throw new AppError('Você já cadastrou uma refeição neste período.');
		}

		const dateMeals = [...dayMeals, newMeal];
		dateMeals.sort(orderMeals);
		await AsyncStorage.setItem(`${MEAL_COLLECTION}-${date}`, JSON.stringify(dateMeals));
	} catch (error) {
		throw error;
	}
}