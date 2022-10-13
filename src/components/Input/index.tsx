import { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Container, Title, MyInput, InputAlignStyle } from './styles';

type Props = TextInputProps & {
	title: string;
	inputAlign?: InputAlignStyle;
	isFilled: boolean;
}

export function Input({ title, isFilled, inputAlign = 'SINGLE', ...rest }: Props) {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<Container inputAlign={inputAlign}>
			<Title>{title}</Title>
			<MyInput
				darkBorder={isFilled !== isFocused}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				{...rest} />
		</Container>
	);
}