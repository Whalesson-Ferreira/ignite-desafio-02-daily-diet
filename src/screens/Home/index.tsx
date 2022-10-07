import { useState, useEffect, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';
import * as PhosphorIcons from 'phosphor-react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { getAllMeals, MealStorageDTO } from '@storage/meal';

import { TopCard } from '@components/TopCard';
import { Percent } from '@components/Percent';
import { Button } from '@components/Button';
import { Meal } from '@components/Meal';
import { Loading } from '@components/Loading';

import { Container, Title, ListDate, NoMealsMessage } from './styles';

export function Home() {
	const [meals, setMeals] = useState<MealStorageDTO[]>([]);
	const [percentage, setPercentage] = useState<number | null>(null);
	const [loadingMeals, setLoadingMeals] = useState(false);

	const navigation = useNavigation();
	const { COLORS } = useTheme();

	function handleNewMeal() {
		navigation.navigate('creationOrEdition', { screenAction: 'CREATION' });
	}

	function handleMealStatistcs() {
		navigation.navigate('statistics', {
			percentage: percentage !== null ? percentage : 0
		});
	}

	function handleMealInfo(dateTime: string) {
		navigation.navigate('meal', {
			dateTime
		});
	}

	function updatePercentage() {
		const amountInsideTheDiet = meals.filter(meal => meal.insideTheDiet === true).length;

		const percentage = (meals.length > 0)
			? (amountInsideTheDiet * 100) / (meals.length)
			: null;

		setPercentage(percentage);
	}

	async function fetchMeals() {
		try {
			setLoadingMeals(true);
			const allMeals = await getAllMeals();
			setMeals(allMeals);
		} catch (error) {
			console.log(error);
			return Alert.alert(
				'Erro',
				'Ocorreu um erro ao carregar as refeições. Por favor, feche a aplicação e tente novamente.'
			)
		} finally {
			setLoadingMeals(false);
		}
	}

	useFocusEffect(useCallback(() => {
		fetchMeals();
	}, []));

	useEffect(() => {
		updatePercentage();
	}, [meals])

	return (
		<Container>
			<TopCard />
			<Percent
				percentage={percentage}
				onPress={handleMealStatistcs}
			/>
			<Title>Refeições</Title>

			<Button
				title='Nova refeição'
				MyIcon={PhosphorIcons.Plus}
				onPress={handleNewMeal}
				style={{ marginBottom: 8 }}
			/>
			{
				loadingMeals
					?
					<Loading
						color={COLORS.GRAY_100}
						size='small'
					/>
					:
					<FlatList
						data={meals}
						keyExtractor={item => item.date + '-' + item.time}
						renderItem={({ item }) => {
							const x = meals.indexOf(item);

							const [currentDay, currentMonth, currentYear] = item.date.split('/');
							const [previousDay, previousMonth, previousYear] = x !== 0
								? meals[x - 1].date.split('/')
								: '';

							return (
								<>
									{
										(currentDay !== previousDay
											|| currentMonth !== previousMonth
											|| currentYear !== previousYear)
										&&
										<ListDate>{currentDay}.{currentMonth}.{currentYear}</ListDate>
									}
									<Meal
										hour={item.time}
										name={item.name}
										inDiet={item.insideTheDiet}
										onPress={() => handleMealInfo(`${item.date}-${item.time}`)}
									/>
								</>
							);
						}}
						showsVerticalScrollIndicator={false}

						contentContainerStyle={
							meals.length === 0
								? { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 15 }
								: { paddingBottom: 100 }
						}
						ListEmptyComponent={() => (
							<NoMealsMessage>Ainda não há refeições cadastradas, adicione sua primeira refeição acima.</NoMealsMessage>
						)}
					/>
			}
		</Container>
	);
}