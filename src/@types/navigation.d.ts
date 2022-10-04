export declare global {
	namespace ReactNavigation {
		interface RootParamList {
			home: undefined;
			statistics: {
				percentage: number;
			};
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
			meal: {
				name: string;
				isInsideTheDiet: boolean;
			}
		}
	}
}