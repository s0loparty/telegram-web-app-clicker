import { useUserStore } from '@/stores/useUserStore';
import { get, getDatabase, ref, query, onValue } from 'firebase/database';
import { useWebApp } from 'vue-tg';

const useFirebase = () => {
	const database = getDatabase();

	const storeUser = useUserStore();
	const webApp = useWebApp();
	const user = webApp.initDataUnsafe.user!;

	const createUser = (): void => {
		const userData: IUserStore = {
			id: user.id,
			firstName: user.first_name,
			lastName: user.last_name,
			username: user.username,
			boosts: [],
			priceOneClick: 1,
			bananas: 0,
			platforms: [webApp.platform],
		};

		storeUser.$patch((state) => {
			for (const key in userData) {
				// @ts-ignore
				if (userData[key]) {
					// @ts-ignore
					state.user[key] = userData[key];
				}
			}
		});

		// console.log('createUser', storeUser.user);

		storeUser.saveUserData();
	};

	const checkUserInDatabase = async (): Promise<IUserStore | null> => {
		const userRef = query(ref(database, 'users/' + user.id));
		const userRecord = await get(userRef);

		return userRecord.val();
	};

	const initUserData = async (): Promise<void> => {
		const userInDatabase = await checkUserInDatabase();

		// console.log('userInDatabase', userInDatabase);

		if (userInDatabase) {
			onValue(ref(database, 'users/' + user.id), (snapshot) => {
				storeUser.updateUserData(snapshot.val());
			});

			return;
		}

		createUser();
	};

	return {
		initUserData,
	};
};

export default useFirebase;
