interface IUserStore {
	id: number;
	firstName: string;
	lastName?: string;
	username?: string;
	priceOneClick: number;
	boosts: IBoostStore[];
	bananas: number;
	platforms: string[];
}

interface IBoostStore {
	price: number;
	label: string;
	icon: string;
	bananas: number;
	color: string;
	description: string;
}
