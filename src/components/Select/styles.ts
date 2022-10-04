import styled, { css } from 'styled-components/native';
import { Circle, IconProps } from 'phosphor-react-native';
import { Pressable } from 'react-native';


type ContainerProps = {
	insideTheDiet: boolean;
	pressed: boolean;
	selected: boolean;
}

type MyIconProps = {
	insideTheDiet: boolean;
}

type PressableAreaProps = MyIconProps;

export const PressableArea = styled(Pressable) <PressableAreaProps>`
	flex: 1;
	${({ insideTheDiet }) => insideTheDiet && css`margin-right: 8px`};
`;

export const Container = styled.View<ContainerProps>`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 16px;
	background-color: ${({ theme, pressed, selected, insideTheDiet }) => pressed
		? theme.COLORS.GRAY_500
		: selected
			? insideTheDiet ? theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT
			: theme.COLORS.GRAY_600
	};
	${({ selected, theme, insideTheDiet }) => selected
		&& css`
		border: 1px solid ${insideTheDiet ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK}`}
	border-radius: 6px;
`;

export const Icon = styled(Circle).attrs<MyIconProps>(({ theme, insideTheDiet }) => ({
	size: 8,
	weight: 'fill',
	color: insideTheDiet ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK
} as IconProps)) <MyIconProps>`
	margin-right: 8px;
`;

export const Status = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.BOLD};
		font-size: ${theme.FONT_SIZE.TITLE.XS}px;
		color: ${theme.COLORS.GRAY_100};
	`};
	text-transform: capitalize;
`