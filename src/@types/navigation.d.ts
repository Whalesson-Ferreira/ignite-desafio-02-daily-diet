type MealRouteParams = {
	dateTime: string;
}

type StatisticsRouteParams = {
	percentage: number;
}

export declare global {
	namespace ReactNavigation {
		interface RootParamList {
			home: undefined;
			statistics: StatisticsRouteParams;
			creationOrEdition: {
				screenAction: 'CREATION' | 'EDITION';
				data?: {
					name: string;
					isInsideTheDiet: boolean;
				}
			};
			feedback: {
				isInsideTheDiet: boolean;
			};
			meal: MealRouteParams;
		}
	}
}