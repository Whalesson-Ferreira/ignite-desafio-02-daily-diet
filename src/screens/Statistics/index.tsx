import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { Data } from '@components/Data';
import { Percent } from '@components/Percent';
import { Content } from '@components/Content';
import { AppStatusBar } from '@components/AppStatusBar';

import { Container, Title } from './styles';

type Params = {
	percentage: number;
}

export function Statistics() {

	const { percentage } = useRoute().params as Params;
	const navigation = useNavigation();
	const { COLORS } = useTheme();

	function handleGoBackHome() {
		navigation.goBack();
	}

	return (
		<Container>
			<AppStatusBar
				type={
					percentage > 50
						? 'PRIMARY'
						: percentage < 50
							? 'SECONDARY'
							: 'GRAY'
				}
			/>
			<Percent
				percentage={percentage}
				asHeader
				onPress={handleGoBackHome}
			/>
			<Content>
				<View>
					<Title>Estatísticas gerais</Title>
					<Data
						number={22}
						info='melhor sequência de pratos dentro da dieta'
					/>
					<Data
						number={109}
						info='refeições registradas'
					/>
					<View style={{ flexDirection: 'row' }}>
						<Data
							number={99}
							info='refeições dentro da dieta'
							type='INSIDE_THE_DIET'
						/>
						<Data
							number={10}
							info='refeições fora da dieta'
							type='OUT_OF_DIET'
						/>
					</View>
				</View>
			</Content>
		</Container>
	);
}