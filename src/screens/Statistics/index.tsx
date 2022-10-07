import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { getStatisticsAboutMeals } from '@storage/statistics/getStatisticsAboutMeals';

import { Data } from '@components/Data';
import { Percent } from '@components/Percent';
import { Content } from '@components/Content';

import { Container, Title, ColorfullContainer } from './styles';

type StatisticsRouteParams = {
	percentage: number;
}

export function Statistics() {

	const [bestSequence, setBestSequence] = useState<number | null>(null);
	const [registeredMeals, setRegisteredMeals] = useState<number | null>(null);
	const [mealsInsideTheDiet, setMealsInsideTheDiet] = useState<number | null>(null);
	const [mealsOffTheDiet, setMealsOffTheDiet] = useState<number | null>(null);

	const { percentage } = useRoute().params as StatisticsRouteParams;
	const navigation = useNavigation();

	function handleGoBackHome() {
		navigation.goBack();
	}

	async function fetchStatistics() {
		try {
			const statistics = await getStatisticsAboutMeals();
			const { bestSequence, mealsInsideTheDiet, mealsOffTheDiet } = statistics;
			setBestSequence(bestSequence);
			setRegisteredMeals(mealsInsideTheDiet + mealsOffTheDiet)
			setMealsInsideTheDiet(mealsInsideTheDiet);
			setMealsOffTheDiet(mealsOffTheDiet);
		} catch (error) {
			console.log(error);
			return Alert.alert(
				'Erro',
				'Ocorreu um erro ao carregar as estatísticas. Por favor, volte e tente novamente.'
			);
		}
	}

	useEffect(() => {
		fetchStatistics();
	})

	return (
		<Container percentage={percentage}>
			<Percent
				percentage={percentage}
				asHeader
				onPress={handleGoBackHome}
			/>
			<Content>
				<Title>Estatísticas gerais</Title>
				<Data
					number={bestSequence}
					info='melhor sequência de pratos dentro da dieta'
				/>
				<Data
					number={registeredMeals}
					info='refeições registradas'
				/>
				<ColorfullContainer>
					<Data
						number={mealsInsideTheDiet}
						info='refeições dentro da dieta'
						type='INSIDE_THE_DIET'
					/>
					<Data
						number={mealsOffTheDiet}
						info='refeições fora da dieta'
						type='OUT_OF_DIET'
					/>
				</ColorfullContainer>
			</Content>
		</Container>
	);
}