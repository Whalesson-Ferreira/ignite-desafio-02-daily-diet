import styled, { css } from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Circle, IconProps } from 'phosphor-react-native';

type Props = {
	isInsideTheDiet: boolean;
}

export const Container = styled(SafeAreaView)`
	flex: 1;
	background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const InfoContainer = styled.View`
	flex: 1;
	align-items: flex-start;
`;

export const Name = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.BOLD};
		font-size: ${theme.FONT_SIZE.TITLE.MD}px;
		color: ${theme.COLORS.GRAY_100};
	`};
	margin-bottom: 8px;
`;

export const Description = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.REGULAR};
		font-size: ${theme.FONT_SIZE.BODY.MD}px;
		color: ${theme.COLORS.GRAY_200};
	`};
	margin-bottom: 20px;
`;

export const Title = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.BOLD};
		font-size: ${theme.FONT_SIZE.TITLE.XS}px;
		color: ${theme.COLORS.GRAY_100};
	`};
	margin-bottom: 8px;
`;

export const DateAndTime = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.REGULAR};
		font-size: ${theme.FONT_SIZE.BODY.MD}px;
		color: ${theme.COLORS.GRAY_200};
	`};
	margin-bottom: 20px;
`;

export const Status = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 8px 16px;
	background-color: ${({ theme }) => theme.COLORS.GRAY_600};
	border-radius: 1000px;
`;

export const Icon = styled(Circle).attrs<Props>(({ theme, isInsideTheDiet }) => ({
	size: 8,
	color: isInsideTheDiet ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK,
	weight: 'fill'
} as IconProps)) <Props>`
	margin-right: 8px;
`;

export const StatusInfo = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.REGULAR};
		font-size: ${theme.FONT_SIZE.BODY.SM}px;
		color: ${theme.COLORS.GRAY_100};	
	`};
	align-items: center;
	text-align: center;
`;