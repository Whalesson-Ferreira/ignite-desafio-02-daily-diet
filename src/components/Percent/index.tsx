import { TouchableOpacityProps } from 'react-native';
import { Container, OpenIcon, ReturnIcon, Percentage, Description, Button } from './styles';

type Props = TouchableOpacityProps & {
	percentage: number;
	asHeader?: boolean;
}

export function Percent({ percentage, asHeader = false, ...rest }: Props) {

	const percentageInText = percentage.toString().replace('.', ',');

	return (
		<Container percentage={percentage} asHeader={asHeader}>
			<Button asHeader={asHeader} {...rest}>
				{
					asHeader
						?
						<ReturnIcon percentage={percentage} />

						:
						<OpenIcon percentage={percentage} />
				}
			</Button>

			<Percentage>{percentage}%</Percentage>
			<Description>das refeições dentro da dieta</Description>
		</Container>
	);
}