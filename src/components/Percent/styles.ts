import styled, { css } from 'styled-components/native';
import { ArrowUpRight, IconProps, ArrowLeft } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';

type ContainerProps = {
	percentage: number;
	asHeader?: boolean;
}

type ButtonProps = {
	asHeader?: boolean;
}

type MyIconProps = {
	percentage: number;
}

export const Container = styled.View<ContainerProps>`
	align-items: center;
	${({ asHeader }) => asHeader
		? css`
			padding: 28px 16px;
			height: 156px;
		`
		: css`
			padding: 20px 16px;
			border-radius: 8px;
			justify-content: center;
	`};	
	background-color: ${({ theme, percentage }) =>
		percentage > 50
			? theme.COLORS.GREEN_LIGHT
			: percentage < 50
				? theme.COLORS.RED_LIGHT
				: theme.COLORS.GRAY_500
	};
`;

export const Button = styled(TouchableOpacity) <ButtonProps>`
	/* align-self: flex-start; */
	align-self: ${({ asHeader }) => asHeader ? 'flex-start' : 'flex-end'};
	top: -8px;
	right: -4px;
	margin-bottom: -24px;
`;

export const OpenIcon = styled(ArrowUpRight).attrs<MyIconProps>(({ theme, percentage }) => ({
	size: 24,
	color: percentage > 50 ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK
} as IconProps)) <MyIconProps>``;

export const ReturnIcon = styled(ArrowLeft).attrs<MyIconProps>(({ theme, percentage }) => ({
	size: 24,
	color: percentage > 50 ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK
} as IconProps)) <MyIconProps>``;

export const Percentage = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.BOLD};
		font-size: ${({ theme }) => theme.FONT_SIZE.TITLE.LG}px;
		color: ${theme.COLORS.GRAY_100};
	`};
`;

export const Description = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.REGULAR};
		font-size: ${theme.FONT_SIZE.BODY.SM}px;
		color: ${theme.COLORS.GRAY_200};
	`};
`;