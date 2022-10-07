import { useState, useCallback, useEffect } from 'react';
import * as PhosphorIcon from 'phosphor-react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';


import { Button } from '@components/Button';
import { Content } from '@components/Content';
import { Header } from '@components/Header';
import { ExclusionModal } from '@components/ExclusionModal';

import {
	Container,
	InfoContainer,
	Name,
	Description,
	Title,
	DateAndTime,
	Status,
	Icon,
	StatusInfo
} from './styles';

type MealRouteParams = {
	dateTime: string;
}

export function MealInfo() {

	const [isModalVisible, setIsModalVisible] = useState(false)


	const route = useRoute();
	// const { dateTime } = route.params as MealRouteParams;

	const navigation = useNavigation();

	function handleGoBackHome() {
		navigation.navigate('home');
	}

	function handleMealEdition() {
		navigation.navigate('creationOrEdition', {
			screenAction: 'EDITION',
			data: {
				name: 'Nome padrão',
				isInsideTheDiet: true
			}
		});
	}

	function handleMealExclusion() {
		setIsModalVisible(true);
	}



	useEffect(() => {
		const { dateTime } = route.params as MealRouteParams;
		console.log(dateTime)
	}, [])

	return (
		<Container isInsideTheDiet={true}>
			{/* <Container isInsideTheDiet={isInsideTheDiet}> */}
			<ExclusionModal
				animationType='slide'
				transparent
				visible={isModalVisible}
				onRequestClose={() => setIsModalVisible(false)}
				onClose={() => setIsModalVisible(false)}
				statusBarTranslucent
			/>
			<Header
				title='Refeição'
				type={'PRIMARY'}
				// type={
				// 	isInsideTheDiet
				// 		? 'PRIMARY'
				// 		: 'SECONDARY'
				// }
				onPress={handleGoBackHome}
			/>
			<Content>
				<InfoContainer>
					<Name>Nome padrão</Name>
					<Description>Descrição padrão</Description>
					<Title>Data e hora</Title>
					<DateAndTime>Data e hora padrão</DateAndTime>
					<Status>
						<Icon isInsideTheDiet={true} />
						{/* <Icon isInsideTheDiet={isInsideTheDiet} /> */}
						<StatusInfo>Status padrão</StatusInfo>
						{/* <StatusInfo>{isInsideTheDiet ? 'dentro ' : 'fora '}da dieta</StatusInfo> */}
					</Status>
				</InfoContainer>
				<Button
					style={{ width: '100%' }}
					title='Editar refeição'
					MyIcon={PhosphorIcon.PencilSimpleLine}
					onPress={handleMealEdition}
				/>
				<Button
					style={{ width: '100%', marginTop: 10 }}
					title='Excluir refeição'
					type='SECONDARY'
					MyIcon={PhosphorIcon.Trash}
					onPress={handleMealExclusion}
				/>
			</Content>
		</Container>
	);
}