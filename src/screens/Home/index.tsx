import { useState } from 'react';
import { Pressable, Text, FlatList, View } from 'react-native';
import * as AllIcons from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

import { TopCard } from '@components/TopCard';
import { Percent } from '@components/Percent';
import { Button } from '@components/Button';
import { Meal } from '@components/Meal';

import { Container, Title, ListDate } from './styles';

type dataT = {
	hour: string;
	name: string;
	inDiet?: boolean;
	date: number;
}

const data: dataT[] = [{
	hour: '20.00',
	name: 'X-tudo',
	// inDiet: true,
	date: 12
}, {
	hour: '16.00',
	name: 'Whey protein com leite',
	inDiet: true,
	date: 12
}, {
	hour: '12.30',
	name: 'Salada cesar com frango grelhado',
	inDiet: true,
	date: 12
}, {
	hour: '9.30',
	name: 'Vitamina de banana com abacate',
	inDiet: true,
	date: 12
}, {
	hour: '20.00',
	name: 'X-tudo 2',
	// inDiet: true,
	date: 11
}, {
	hour: '16.00',
	name: 'Whey protein com leite 2',
	inDiet: true,
	date: 11
}, {
	hour: '12.30',
	name: 'Salada cesar com frango grelhado 2',
	inDiet: true,
	date: 11
}, {
	hour: '9.30',
	name: 'Vitamina de banana com abacate 2',
	inDiet: true,
	date: 11
}, {
	hour: '20.00',
	name: 'X-tudo 3',
	// inDiet: true,
	date: 10
}, {
	hour: '16.00',
	name: 'Whey protein com leite 3',
	inDiet: true,
	date: 10
}, {
	hour: '12.30',
	name: 'Salada cesar com frango grelhado 3',
	inDiet: true,
	date: 10
}, {
	hour: '9.30',
	name: 'Vitamina de banana com abacate 3',
	inDiet: true,
	date: 10
}]

const data2: dataT[] = [];

export function Home() {

	const navigation = useNavigation();

	function handleNewMeal() {
		navigation.navigate('creationOrEdition', { screenAction: 'CREATION' });
	}

	function handleMealStatistcs() {
		navigation.navigate('statistics', { percentage: 50 });
	}

	function handleMealInfo(info: { name: string; isInsideTheDiet: boolean; }) {
		navigation.navigate('meal', info);
	}

	return (
		<Container>
			<TopCard />
			<Percent
				percentage={90.86}
				onPress={handleMealStatistcs}
			/>
			<Title>Refeições</Title>

			<Button
				// type='SECONDARY'
				title='Nova refeição'
				MyIcon={AllIcons.Plus}
				onPress={handleNewMeal}
			/>

			{/* <ListDate>{data[0].date}.08.22</ListDate> */}
			<FlatList
				data={data}
				keyExtractor={item => item.name}
				renderItem={({ item }) => {
					const x = data.indexOf(item);

					if (x === 0 || data[x].date !== data[x - 1].date) {
						return (
							<>
								<ListDate>{item.date}.08.22</ListDate>
								<Meal
									hour={item.hour}
									name={item.name}
									inDiet={item.inDiet}
									onPress={() => handleMealInfo({
										name: item.name,
										isInsideTheDiet: item.inDiet ? item.inDiet : false
									})}
								/>
							</>
						);
					}
					return (
						<Meal
							hour={item.hour}
							name={item.name}
							inDiet={item.inDiet}
							onPress={() => handleMealInfo({
								name: item.name,
								isInsideTheDiet: item.inDiet ? item.inDiet : false
							})}
						/>
					);
				}}
				showsVerticalScrollIndicator={false}

				contentContainerStyle={data.length === 0 ? { flex: 1, alignItems: 'center', justifyContent: 'center' } : {}}
				ListEmptyComponent={() => (
					<Text>Nada</Text>
				)}
			/>

		</Container>
	);
}