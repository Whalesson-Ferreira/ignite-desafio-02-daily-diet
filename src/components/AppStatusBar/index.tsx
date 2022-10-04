import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components/native';

type Props = {
	type?: 'DEFAULT' | 'PRIMARY' | 'SECONDARY' | 'GRAY';
}

export function AppStatusBar({ type = 'DEFAULT' }: Props) {

	const { COLORS } = useTheme();

	return (
		<StatusBar
			barStyle={'dark-content'}
			backgroundColor={
				type === 'PRIMARY'
					? COLORS.GREEN_LIGHT
					: type === 'SECONDARY'
						? COLORS.RED_LIGHT
						: type === 'GRAY'
							? COLORS.GRAY_500
							: COLORS.GRAY_700
			}
			translucent
		/>
	);
}