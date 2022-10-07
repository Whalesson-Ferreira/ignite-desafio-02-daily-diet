import { TextInputProps } from 'react-native';
import { Container, Title, MyInput, InputAlignStyle } from './styles';

type Props = TextInputProps & {
	title: string;
	inputAlign?: InputAlignStyle;

}

export function Input({ title, inputAlign = 'SINGLE', ...rest }: Props) {
	return (
		<Container inputAlign={inputAlign}>
			<Title>{title}</Title>
			<MyInput
				// selectionColor={'black'}
				{...rest} />
		</Container>
	);
}