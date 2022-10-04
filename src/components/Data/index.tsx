import { Container, Number, Info, DataType } from './styles';

type Props = {
	number: number;
	info: string;
	type?: DataType;
}

export function Data({ number, info, type = 'DEFAULT' }: Props) {
	return (
		<Container type={type}>
			<Number>{number}</Number>
			<Info>{info}</Info>
		</Container>
	);
}