import { useRoute, useNavigation } from '@react-navigation/native';

import { Button } from '@components/Button';

import {
	Container,
	Title,
	Description,
	Illustration,
	Bold
} from './styles';

import sucessImg from '@assets/sucess.png';
import alertImg from '@assets/alert.png';

type Params = {
	isInsideTheDiet: boolean;
}

export function Feedback() {
	const route = useRoute();
	const { isInsideTheDiet } = route.params as Params;
	const navigation = useNavigation();

	function handleGoBackHome() {
		navigation.navigate('home');
	}

	return (
		<Container>
			<Title isInsideTheDiet={isInsideTheDiet}>
				{
					isInsideTheDiet
						? 'Continue assim!'
						: 'Que pena!'
				}
			</Title>
			{
				isInsideTheDiet
					?
					<Description>Você continua <Bold>dentro da dieta.</Bold> Muito bem!</Description>
					:
					<Description>Você <Bold>saiu da dieta</Bold> dessa vez, mas continue se esforçando e não desista!</Description>
			}
			<Illustration
				source={isInsideTheDiet ? sucessImg : alertImg}
			/>
			<Button
				title='Ir para a página inicial'
				onPress={handleGoBackHome}
			/>
		</Container>
	);
}