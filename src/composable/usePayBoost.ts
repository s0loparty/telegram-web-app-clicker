import { useUserStore } from '@/stores/useUserStore';
import useSoundEffects from '@/composable/useSoundEffects';

const usePayBoost = () => {
	const storeUser = useUserStore();

	const { playPayBoost } = useSoundEffects();

	const handlePay = async (boost: IBoostStore) => {
		playPayBoost();

		storeUser.$patch((state) => {
			// отнимает цену буста от общего кол-ва бананов
			// storeBanana.bananas = storeBanana.bananas - boost.price;
			state.user.bananas = state.user.bananas - boost.price;

			// добавляем буст к юзеру
			// добавляем кол-во бананов за 1 клик
			state.user.priceOneClick = boost.bananas + 1;
			state.user.boosts.push(boost);

			console.log('path sate', state);
		});

		// storeUser.user.boosts.push(boost);
		// storeUser.user.priceOneClick = boost.bananas + 1;

		// сохраняем купленный буст в БД
		// await storeUser.saveBoost();
		// сохраняем дату юзера в бд
		await storeUser.saveUserData();
	};

	return {
		handlePay,
	};
};

export default usePayBoost;
