import { useState } from 'react';
import * as PhosphorIcon from 'phosphor-react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { Button } from '@components/Button';
import { Content } from '@components/Content';
import { Header } from '@components/Header';
import { ExclusionModal } from '@components/ExclusionModal';
import { AppStatusBar } from '@components/AppStatusBar';

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

const data = {
	name: 'Sanduíche',
	description: 'Sanduíche de pão integral com atum e salada de alface e tomate',
	dateAndTime: '12/08/2022 às 16:00',
	isInsideTheDiet: true
};

const data2 = {
	name: 'X-tudo',
	description: 'Xis completo da lancheria do bairro',
	dateAndTime: '12/08/2022 às 20:00',
	isInsideTheDiet: false
};

export function MealInfo() {

	const [isModalVisible, setIsModalVisible] = useState(false)

	const { description, dateAndTime } = data2;

	const { COLORS } = useTheme();
	const route = useRoute();
	const { name, isInsideTheDiet } = route.params as { name: string; isInsideTheDiet: boolean; };
	const navigation = useNavigation();

	function handleGoBackHome() {
		navigation.navigate('home');
	}

	function handleMealEdition() {
		navigation.navigate('creationOrEdition', {
			screenAction: 'EDITION',
			data: {
				name,
				isInsideTheDiet
			}
		});
	}

	function handleMealExclusion() {
		setIsModalVisible(true);
	}

	return (
		<Container>
			<AppStatusBar
				type={
					isInsideTheDiet
						? 'PRIMARY'
						: 'SECONDARY'
				}
			/>
			<ExclusionModal
				animationType='slide'
				transparent
				visible={isModalVisible}
				onRequestClose={() => setIsModalVisible(false)}
				onClose={() => setIsModalVisible(false)}
			/>
			<Header
				title='Refeição'
				type={
					isInsideTheDiet
						? 'PRIMARY'
						: 'SECONDARY'
				}
				onPress={handleGoBackHome}
			/>
			<Content>
				<InfoContainer>
					<Name>{name}</Name>
					<Description>{description}</Description>
					<Title>Data e hora</Title>
					<DateAndTime>{dateAndTime}</DateAndTime>
					<Status>
						<Icon isInsideTheDiet={isInsideTheDiet} />
						<StatusInfo>{isInsideTheDiet ? 'dentro ' : 'fora '}da dieta</StatusInfo>
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