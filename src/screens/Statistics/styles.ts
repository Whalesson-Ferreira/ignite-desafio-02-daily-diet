import styled, { css } from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {
	percentage: number;
}

export const Container = styled(SafeAreaView) <Props>`
	flex: 1;
	background-color: ${({ theme, percentage }) =>
		percentage > 50
			? theme.COLORS.GREEN_LIGHT
			: theme.COLORS.RED_LIGHT
	};
`;

export const Title = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.BOLD};
		font-size: ${theme.FONT_SIZE.TITLE.XS}px;
		color: ${theme.COLORS.GRAY_100};
	`};
	align-self: center;
	margin-bottom: 20px;
`;

export const ColorfullContainer = styled.View`
	flex-direction: row;
`