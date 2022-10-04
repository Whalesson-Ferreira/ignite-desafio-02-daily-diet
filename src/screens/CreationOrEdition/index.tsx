import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { Header } from '@components/Header';
import { Content } from '@components/Content';
import { Input } from '@components/Input';
import { Select } from '@components/Select';
import { Button } from '@components/Button';
import { AppStatusBar } from '@components/AppStatusBar';

import { Container, Form, SelectTitle, SelectContainer } from './styles';

type Params = {
	screenAction: 'CREATION' | 'EDITION';
	data?: {
		name: string;
		isInsideTheDiet: boolean;
	}
}

export function CreationOrEdition() {
	const [selectedOption, setSelectedOption] = useState<boolean | null>(null);

	const { COLORS } = useTheme();
	const route = useRoute();
	const { screenAction, data } = route.params as Params;
	const navigation = useNavigation();

	function handleGoBackHome() {
		navigation.goBack();
	}

	function handleNewMeal() {
		navigation.navigate('feedback', { isInsideTheDiet: true });
	}

	function handleSaveMeal() {
		navigation.navigate('home');
	}



	useEffect(() => {
		if (data) {
			console.log(data)
			setSelectedOption(data.isInsideTheDiet);
		}
	}, []);

	return (
		<Container>
			<AppStatusBar type='GRAY' />
			<Header
				title={screenAction === 'CREATION' ? 'Nova refeição' : 'Editar refeição'}
				onPress={handleGoBackHome}
			/>
			<Content>
				<Form showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
					<Input
						title='Nome'
						value={data ? data.name : ''}
					/>
					<Input
						title='Descrição'
						multiline
						numberOfLines={4}
						style={{ height: 120 }}
						textAlignVertical={'top'}
					/>

					<View style={{ flexDirection: 'row' }}>
						<Input title='Data' sydeBySyde='FIRST' />
						<Input title='Hora' sydeBySyde='SECOND' />
					</View>


					<SelectTitle>Está dentro da dieta?</SelectTitle>
					<SelectContainer>
						<Select
							onPress={() => setSelectedOption(true)}
							selected={selectedOption || false}
						/>
						<Select
							insideTheDiet={false}
							onPress={() => setSelectedOption(false)}
							selected={!selectedOption && selectedOption !== null}
						/>
					</SelectContainer>
				</Form>
				<Button
					style={{ marginTop: 6 }}
					title={screenAction === 'CREATION' ? 'Cadastrar refeição' : 'Salvar alterações'}
					onPress={screenAction === 'CREATION' ? handleNewMeal : handleSaveMeal}
				/>
			</Content>
		</Container>
	);
}