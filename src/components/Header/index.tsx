import { View, TouchableOpacityProps } from 'react-native';
import { Container, Button, Icon, Title, HeaderType } from './styles';

type Props = TouchableOpacityProps & {
	title: string;
	type?: HeaderType;
}

export function Header({ title, type = 'DEFAULT', ...rest }: Props) {
	return (
		<Container type={type}>
			<Button {...rest}>
				<Icon />
			</Button>
			<Title>{title}</Title>
			<View style={{ width: 24 }} />
		</Container>
	);
}