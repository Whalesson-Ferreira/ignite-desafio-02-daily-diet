import { Container, Logo, UserIcon } from './styles';

import logoImg from '@assets/logo.png';
import ellipseImg from '@assets/ellipse.png';

export function TopCard() {
	return (
		<Container>
			<Logo source={logoImg} />
			<UserIcon source={ellipseImg} />
		</Container>
	);
}