import styled, { css } from 'styled-components/native';
import { TextInputProps, TextInput } from 'react-native';

export type InputAlignStyle = 'SINGLE' | 'LEFT' | 'RIGHT';

type Props = {
	inputAlign: InputAlignStyle;
}


export const Container = styled.View<Props>`
	${({ inputAlign }) => inputAlign === 'SINGLE'
		? null
		: inputAlign === 'LEFT'
			? css`flex: 1; margin-right: 20px;`
			: css`flex: 1`
	};
`;

export const Title = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.BOLD};
		font-size: ${theme.FONT_SIZE.TITLE.XS}px;
		color: ${theme.COLORS.GRAY_200};
	`};
`;

export const MyInput = styled(TextInput).attrs(({ theme }) => ({
	selectionColor: theme.COLORS.GRAY_400
} as TextInputProps))`
	padding: 14px;
	align-items: center;
	height: 48px;
	margin-top: 4px;
	margin-bottom: 24px;
	border-radius: 6px;
	${({ theme }) => css`
		border: 1px solid ${theme.COLORS.GRAY_500};
		font-family: ${theme.FONT_FAMILY.REGULAR};
		font-size: ${theme.FONT_SIZE.BODY.MD}px;
		color: ${theme.COLORS.GRAY_100};
	`};
`;