import { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { getStatistics } from '@storage/meal';

import { Data } from '@components/Data';
import { Percent } from '@components/Percent';
import { Content } from '@components/Content';
import { Loading } from '@components/Loading';

import { Container, Title, ColorfullContainer } from './styles';

type StatisticsRouteParams = {
	percentage: number;
}

export function Statistics() {

	const [bestSequence, setBestSequence] = useState<number>(-1);
	const [registeredMeals, setRegisteredMeals] = useState<number>(-1);
	const [mealsInsideTheDiet, setMealsInsideTheDiet] = useState<number>(-1);
	const [mealsOffTheDiet, setMealsOffTheDiet] = useState<number>(-1);

	const [loading, setLoading] = useState(true);

	const { percentage } = useRoute().params as StatisticsRouteParams;
	const navigation = useNavigation();
	const { COLORS } = useTheme();

	function handleGoBackHome() {
		navigation.goBack();
	}

	async function fetchStatistics() {
		try {
			const statistics = await getStatistics();
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
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchStatistics();
	}, [])

	return (
		<Container percentage={percentage}>
			<Percent
				percentage={percentage}
				asHeader
				onPress={handleGoBackHome}
			/>
			<Content>
				{
					loading
						?
						<Loading color={COLORS.GRAY_100} />
						:
						<ScrollView
							showsVerticalScrollIndicator={false}
						>
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
						</ScrollView>
				}
			</Content>
		</Container>
	);
}