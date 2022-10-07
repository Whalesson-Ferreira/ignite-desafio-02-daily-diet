import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import {
	useFonts,
	NunitoSans_400Regular,
	NunitoSans_700Bold
} from '@expo-google-fonts/nunito-sans';

import { AppStatusBar } from '@components/AppStatusBar';
import { Loading } from '@components/Loading';
import * as NavigationBar from 'expo-navigation-bar';

import theme from './src/theme';

import { Routes } from './src/routes';

export default function App() {

	const [fontsLoaded] = useFonts({
		NunitoSans_400Regular,
		NunitoSans_700Bold
	});

	const [completeConfig, setCompleteConfig] = useState(false);

	async function setNavigationBar() {
		try {
			await NavigationBar.setBackgroundColorAsync(theme.COLORS.GRAY_100);
			await NavigationBar.setButtonStyleAsync('light');
		} catch (error) {
			console.log('Erro ao configurar NavigationBar --> ', error)
		} finally {
			setCompleteConfig(true);
		}
	}

	useEffect(() => {
		setNavigationBar();
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<AppStatusBar />
			{
				fontsLoaded && completeConfig
					? <Routes />
					: <Loading color={theme.COLORS.GRAY_100} />
			}
		</ThemeProvider>
	);
}
