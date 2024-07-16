<template>
	<header class="w-full bg-slate-700 shadow-md">
		<div class="flex items-center justify-between gap-4 py-2 px-4">
			<div class="flex flex-col">
				<div class="flex items-center gap-2 text-orange-300 font-bold">
					<span>🍌</span>
					<CountUp
						:start-val="prevBananas"
						:end-val="storeUser.user.bananas"
						:duration="0.8"
					/>
				</div>
				<div
					class="text-sm text-yellow-200 drop-shadow-[0_2px_2px_rgba(254,240,138,0.50)]"
				>
					{{ congratMessage }}
				</div>
			</div>
			<div class="text-gray-200">
				<div v-if="storeUser.user.username">@{{ storeUser.user.username }}</div>
				<div>{{ storeUser.user.firstName + storeUser.user.lastName }}</div>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore';
import { computed, ref, watch } from 'vue';
import CountUp from 'vue-countup-v3';

const MESSAGES = [
	'Потрясающе!',
	'ЭТО. ПРОСТО. НЕЧТО!',
	'Да ты безумец!',
	'Восхитительно!',
];

const storeUser = useUserStore();

const prevBananas = ref(storeUser.user.bananas);

const prevBananasInterval = ref(storeUser.user.bananas);
const isShowMessage = ref(false);
const congratMessage = computed(() => {
	return isShowMessage.value
		? MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
		: '';
});

const checkDifferenceBananas = () => {
	if (prevBananasInterval.value === storeUser.user.bananas) {
		isShowMessage.value = false;
	} else {
		isShowMessage.value = true;
	}
	prevBananasInterval.value = storeUser.user.bananas;
};

setInterval(checkDifferenceBananas, 6000);

watch(
	() => storeUser.user.bananas,
	(_, oldValue) => {
		prevBananas.value = oldValue;
	},
	{ deep: true }
);
</script>
