import { Container, Number, Info, DataType, LoadingStats } from './styles';

type Props = {
	number: number | null;
	info: string;
	type?: DataType;
}

export function Data({ number, info, type = 'DEFAULT' }: Props) {
	return (
		<Container type={type}>
			{
				number
					?
					<Number>{number}</Number>
					:
					<LoadingStats />
			}
			<Info>{info}</Info>
		</Container>
	);
}