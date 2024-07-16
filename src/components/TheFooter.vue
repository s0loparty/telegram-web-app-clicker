<template>
	<footer class="w-full bg-slate-700">
		<div class="px-4 py-4 flex items-center justify-between gap-2">
			<RouterLink
				to="/"
				class="rounded block text-gray-300 bg-slate-600 px-3 py-1 shadow-md border border-transparent"
			>
				🍌 ИГРАТЬ
			</RouterLink>
			<RouterLink
				to="/boosts"
				class="relative rounded block text-gray-300 bg-slate-600 px-3 py-1 shadow-md border border-transparent"
			>
				<CirclePing v-if="storeUser.canBuyBoost" />
				🔥 БУСТЫ
			</RouterLink>
			<!-- <RouterLink
				to="#"
				class="rounded block text-gray-300 bg-slate-600 px-3 py-1 shadow-md border border-transparent"
			>
				🙈
			</RouterLink> -->
			<ButtonSoundEffects />
		</div>
	</footer>
</template>

<script setup lang="ts">
import ButtonSoundEffects from '@/components/ui/ButtonSoundEffects.vue';
import { useUserStore } from '@/stores/useUserStore';
import CirclePing from './ui/CirclePing.vue';

const storeUser = useUserStore();
</script>
