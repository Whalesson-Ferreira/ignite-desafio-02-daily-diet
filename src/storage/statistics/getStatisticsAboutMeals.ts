import { getAllMeals } from '../meal/getAllMeals';

type Statistics = {
	bestSequence: number;
	mealsInsideTheDiet: number;
	mealsOffTheDiet: number;
}

export async function getStatisticsAboutMeals() {
	try {
		const allMeals = await getAllMeals();

		const mealsInsideTheDiet = allMeals.filter((meal) => meal.insideTheDiet === true).length;

		let best = 0;
		let count = 0;
		allMeals.map((value) => {
			if (value.insideTheDiet === true) {
				count++;
				if (count > best) {
					best = count;
				}
			}
			else {
				count = 0;
			}
		});

		const statistics: Statistics = {
			bestSequence: best,
			mealsInsideTheDiet,
			mealsOffTheDiet: (allMeals.length - mealsInsideTheDiet)
		};

		return statistics;
	} catch (error) {
		throw error;
	}
}