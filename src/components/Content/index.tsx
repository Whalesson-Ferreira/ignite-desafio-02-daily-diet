import { Container } from './styles';
import React from 'react';

type Props = {
	children: React.ReactNode;
}

export function Content({ children }: Props) {
	return (
		<Container>
			{children}
		</Container >
	);
}