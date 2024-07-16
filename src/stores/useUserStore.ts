import { defineStore } from 'pinia';
import { computed, reactive, ref, watch, watchEffect } from 'vue';
import { ref as dbRef, set } from 'firebase/database';
import { database } from '@/firebase';
import { BOOSTS } from '@/constants';
import { useWebApp } from 'vue-tg';

export const useUserStore = defineStore('userStore', () => {
	const user = reactive<IUserStore>({
		id: 0,
		firstName: '',
		lastName: '',
		username: '',
		boosts: [],
		priceOneClick: 1,
		bananas: 0,
		platforms: [],
	});

	const firebaseUid = ref('');
	const soundEffects = ref(true);

	const webApp = useWebApp();

	// куплен ли буст
	const isBoostPayed = (boost: IBoostStore): boolean => {
		return !!user.boosts.find((b) => b.label === boost.label);
	};

	// может ли купить буст
	const canBuyBoost = computed(() => {
		return !!BOOSTS.find((boost) => {
			return user.bananas >= boost.price && !isBoostPayed(boost);
		});
	});

	const updateUserData = (userData: IUserStore): void => {
		for (const key in userData) {
			// @ts-ignore
			user[key] = userData[key];

			if (userData['boosts'] === undefined) {
				user.boosts = [];
			}
		}
	};

	const addBananasPerClick = (): void => {
		user.bananas = user.bananas + user.priceOneClick;
	};

	async function saveUserData(): Promise<void> {
		const userRef = dbRef(database, 'users/' + user.id);
		set(userRef, user);
	}

	async function saveBoost(): Promise<void> {
		const userBoostsRef = dbRef(database, `users/${user.id}/boosts`);
		set(userBoostsRef, user.boosts);
	}

	watchEffect(() => {
		if (!user.platforms.includes(webApp.platform)) {
			user.platforms.push(webApp.platform);
		}
	});

	watch(user, saveUserData, { deep: true });

	return {
		user,
		firebaseUid,
		soundEffects,
		isBoostPayed,
		canBuyBoost,
		updateUserData,
		addBananasPerClick,
		saveBoost,
		saveUserData,
	};
});
