<template>
	<component
		v-if="isShowApp && storeUser.user.id"
		:is="layoutName"
	>
		<RouterView />
	</component>
	<div
		v-else
		class="h-screen flex items-center justify-center gap-4"
	>
		<img
			v-for="index in 3"
			:key="index"
			:src="bananImage"
			:class="[`w-14 animate-bounce animate-infinite`]"
			:style="`--tw-animate-delay: ${index}00ms`"
		/>
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { useWebApp, useWebAppViewport } from 'vue-tg';
import { useRouter } from 'vue-router';
import useFirebase from '@/composable/useFirebase';
import bananImage from '@/assets/images/banana.png';

const storeUser = useUserStore();
const webApp = useWebApp();
const webAppView = useWebAppViewport();
const router = useRouter();
const { initUserData } = useFirebase();

const layoutName = ref('MainLayout');
const isShowApp = ref(false);

setTimeout(() => (isShowApp.value = true), 3000);

watch(
	() => router.currentRoute.value,
	(route) => {
		const layout = route.meta?.layout;
		layoutName.value = layout ? `${layout}Layout` : 'MainLayout';
	}
);

onMounted(async () => {
	if (!webApp.initDataUnsafe.user) return;

	await initUserData();

	router.push('/');

	// раскрываем на полный экран
	webAppView.expand();
});

onUnmounted(storeUser.saveUserData);
</script>
