import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import {
	useFonts,
	NunitoSans_400Regular,
	NunitoSans_700Bold
} from '@expo-google-fonts/nunito-sans';

import { AppStatusBar } from '@components/AppStatusBar';

import theme from './src/theme';

import { Routes } from './src/routes';

export default function App() {

	const [fontsLoaded] = useFonts({
		NunitoSans_400Regular,
		NunitoSans_700Bold
	});

	const [screen, setScreen] = useState('Home');

	const [statusBarColor, setStatusBarColor] = useState(theme.COLORS.GRAY_700);

	return (
		<ThemeProvider theme={theme}>
			<AppStatusBar />
			{
				fontsLoaded
					? <Routes />
					: <ActivityIndicator />
			}
		</ThemeProvider>
	);
}
