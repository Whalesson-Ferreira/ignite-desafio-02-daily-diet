import { TextInputProps } from 'react-native';
import { Container, Title, MyInput, InputOrder } from './styles';

type Props = TextInputProps & {
	title: string;
	sydeBySyde?: InputOrder;

}

export function Input({ title, sydeBySyde = 'SINGLE', ...rest }: Props) {
	return (
		<Container sydeBySyde={sydeBySyde}>
			<Title>{title}</Title>
			<MyInput
				// selectionColor={'black'}
				{...rest} />
		</Container>
	);
}