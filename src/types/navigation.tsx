export type MainStackParamList = {
	MainTabs: undefined;
	SecondScreen: undefined;
	Send: { amt: number|null,email:string|null };
	Receive: undefined;
};

export type AuthStackParamList = {
	Login: undefined;
	Register: undefined;
	ForgetPassword: undefined;
};

export type MainTabsParamList = {
	Home: undefined;
	Profile: undefined;
	About: undefined;
};

export type Transaction = {
	id?: string;
	amount: number;
	from: string;
	to: string;
  };
