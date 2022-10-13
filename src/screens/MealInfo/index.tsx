import { useState, useEffect } from 'react';
import * as PhosphorIcon from 'phosphor-react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { getMeal, removeMeal } from '@storage/meal';

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
import { AppError } from '@utils/AppError';
import { Alert } from 'react-native';
import { Loading } from '@components/Loading';

type MealRouteParams = {
	dateTime: string;
}

export function MealInfo() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [isInsideTheDiet, setIsInsideTheDiet] = useState<boolean | null>(null);

	const [isModalVisible, setIsModalVisible] = useState(false)


	const route = useRoute();
	const { COLORS } = useTheme();

	const navigation = useNavigation();

	function handleGoBackHome() {
		navigation.navigate('home');
	}

	function handleMealEdition() {
		const { dateTime } = route.params as MealRouteParams;
		navigation.navigate('creationOrEdition', {
			screenAction: 'EDITION',
			dateTime
		});
	}

	function handleMealExclusion() {
		setIsModalVisible(true);
	}

	function handleCancelExclusion() {
		setIsModalVisible(false);
	}

	async function handleConfirmExclusion() {
		try {
			await removeMeal(`${date}-${time}`);
			navigation.navigate('home');
		} catch (error) {
			console.log(error);
			if (error instanceof AppError) {
				return Alert.alert(
					'Erro',
					error.message,
					[
						{
							text: 'Ok',
							onPress: () => navigation.navigate('home')
						}
					]
				);
			}

			return Alert.alert(
				'Erro',
				'Não foi possível excluir a refeição, tente novamente.',
				[
					{
						text: 'Ok',
						onPress: () => setIsModalVisible(false)
					}
				]
			);
		}
	}

	async function fetchMeal() {
		try {
			const { dateTime } = route.params as MealRouteParams;
			const specificMeal = await getMeal(dateTime);

			const { name, description, date, time, isInsideTheDiet } = specificMeal;
			setName(name);
			setDescription(description);
			setDate(date);
			setTime(time);
			setIsInsideTheDiet(isInsideTheDiet);
		} catch (error) {
			console.log(error);
			if (error instanceof AppError) {
				return Alert.alert(
					'Erro',
					error.message,
					[
						{
							text: 'Ok',
							onPress: () => navigation.navigate('home')
						}
					]
				);
			}
			return Alert.alert(
				'Erro',
				'Ocorreu um erro ao buscar as informações sobre a refeição, tente novamente.',
				[
					{
						text: 'Ok',
						onPress: () => navigation.navigate('home')
					}
				]
			);
		}
	}

	useEffect(() => {
		fetchMeal();
	}, [])

	return (
		<Container isInsideTheDiet={isInsideTheDiet}>
			<ExclusionModal
				animationType='slide'
				transparent
				visible={isModalVisible}
				onRequestClose={handleCancelExclusion}
				onClose={handleCancelExclusion}
				onDelete={handleConfirmExclusion}
				statusBarTranslucent
			/>
			<Header
				title='Refeição'
				type={
					isInsideTheDiet === null
						? 'DEFAULT'
						: isInsideTheDiet === true
							? 'PRIMARY'
							: 'SECONDARY'
				}
				onPress={handleGoBackHome}
			/>
			<Content>
				{
					(name.trim().length > 0
						&& description.trim().length > 0
						&& date.trim().length > 0
						&& time.trim().length > 0
						&& description !== null)

						?
						<>
							<InfoContainer>
								<Name>{name}</Name>
								<Description>{description}</Description>
								<Title>Data e hora</Title>
								<DateAndTime>{date} às {time}</DateAndTime>
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
						</>
						:
						<Loading color={COLORS.GRAY_100} />
				}
			</Content>
		</Container>
	);
}