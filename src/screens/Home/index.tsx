import { useState, useEffect, useCallback } from 'react';
import { SectionList, Alert } from 'react-native';
import * as PhosphorIcons from 'phosphor-react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import MaskedView from '@react-native-masked-view/masked-view';

import { getMealsInSection, MealsSectionDTO } from '@storage/meal';

import { TopCard } from '@components/TopCard';
import { Percent } from '@components/Percent';
import { Button } from '@components/Button';
import { MealCard } from '@components/MealCard';
import { Loading } from '@components/Loading';

import { Container, Title, ListDate, NoMealsMessage, Gradient } from './styles';

export function Home() {
	const [mealsInSection, setMealsInSection] = useState<MealsSectionDTO[]>([]);
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
		let amountInsideTheDiet = 0;
		let amountOfMeals = 0;
		for (let index in mealsInSection) {
			const sectionAmount = mealsInSection[index].data.filter(
				meal => meal.isInsideTheDiet === true
			).length;
			amountOfMeals += mealsInSection[index].data.length;
			amountInsideTheDiet += sectionAmount;
		}

		const percentage = (amountOfMeals > 0)
			? (amountInsideTheDiet * 100) / (amountOfMeals)
			: null;

		setPercentage(percentage);
	}

	async function fetchMeals() {
		try {
			setLoadingMeals(true);
			const allMealsInSection = await getMealsInSection();
			setMealsInSection(allMealsInSection);
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
	}, [mealsInSection])

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
					<MaskedView
						maskElement={<Gradient />}
						style={{ flex: 1 }}
					>
						<SectionList
							sections={mealsInSection}
							keyExtractor={item => item.date + '-' + item.time}
							renderItem={({ item }) => (
								<MealCard
									name={item.name}
									hour={item.time}
									isInsideTheDiet={item.isInsideTheDiet}
									onPress={() => handleMealInfo(`${item.date}-${item.time}`)}
								/>
							)}
							renderSectionHeader={({ section }) => {
								const [day, month, year] = section.title.split('/');
								const newYear = year.substring(2, 4);

								return <ListDate>{day}.{month}.{newYear}</ListDate>
							}}
							showsVerticalScrollIndicator={false}
							contentContainerStyle={
								mealsInSection.length === 0
									? { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 15 }
									: { paddingBottom: '40%' }
							}
							ListEmptyComponent={() => (
								<NoMealsMessage>Ainda não há refeições cadastradas, adicione sua primeira refeição acima.</NoMealsMessage>
							)}
						/>
					</MaskedView>
			}
		</Container>
	);
}