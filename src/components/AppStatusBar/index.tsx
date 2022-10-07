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
			backgroundColor='transparent'
			translucent
		/>
	);
}