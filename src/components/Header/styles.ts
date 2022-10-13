import styled, { css } from 'styled-components/native';
import { ArrowLeft, IconProps } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';

export type HeaderType = 'DEFAULT' | 'PRIMARY' | 'SECONDARY';

type Props = {
	type: HeaderType;
}

export const Container = styled.View<Props>`
	flex-direction: row;
	background-color: ${({ theme, type }) => type === 'PRIMARY'
		? theme.COLORS.GREEN_LIGHT
		: type === 'SECONDARY'
			? theme.COLORS.RED_LIGHT
			: theme.COLORS.GRAY_500
	};
	align-items: flex-start;
	padding: 18px 24px;
	justify-content: space-between;
`;

export const Button = styled(TouchableOpacity)``

export const Icon = styled(ArrowLeft).attrs(({ theme }) => ({
	size: theme.FONT_SIZE.TITLE.SM + theme.FONT_SIZE.TITLE.SM / 3,
	color: theme.COLORS.GRAY_200
} as IconProps))``;

export const Title = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.BOLD};
		font-size: ${theme.FONT_SIZE.TITLE.SM}px;
		color: ${theme.COLORS.GRAY_100};
	`};
	text-align: center;
`;