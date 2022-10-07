import styled, { css } from 'styled-components/native';
import { ArrowLeft, IconProps } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';

export type HeaderType = 'DEFAULT' | 'PRIMARY' | 'SECONDARY';

type Props = {
	type: HeaderType;
}

export const Container = styled.View<Props>`
	height: 88px;
	flex-direction: row;
	background-color: ${({ theme, type }) => type === 'PRIMARY'
		? theme.COLORS.GREEN_LIGHT
		: type === 'SECONDARY'
			? theme.COLORS.RED_LIGHT
			: theme.COLORS.GRAY_500
	};
	padding: 13px 24px;
	justify-content: space-between;
`;

export const Button = styled(TouchableOpacity)``

export const Icon = styled(ArrowLeft).attrs(({ theme }) => ({
	size: 24,
	color: theme.COLORS.GRAY_200
} as IconProps))``;

export const Title = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.BOLD};
		font-size: ${theme.FONT_SIZE.TITLE.SM}px;
		color: ${theme.COLORS.GRAY_100};
	`};
`;