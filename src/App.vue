<template>
	<component
		v-if="isShowApp"
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

	<ExpandedViewport :force="true" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { useWebApp, ExpandedViewport } from 'vue-tg';
import { useRouter } from 'vue-router';
import useFirebase from '@/composable/useFirebase';
import bananImage from '@/assets/images/banana.png';
import { PLATFORMS_LOCKED } from './constants';

const storeUser = useUserStore();
const webApp = useWebApp();
const router = useRouter();
const { initUserData } = useFirebase();

const layoutName = ref('MainLayout');
const isShowApp = ref(false);

const checkLoading = setTimeout(loadApp, 1000);

async function loadApp() {
	if (!webApp.initDataUnsafe.user) {
		return;
	}

	clearInterval(checkLoading);

	await initUserData();

	router.push('/');

	isShowApp.value = true;
}

function checkPlatform() {
	const isProd = import.meta.env.PROD;
	const isLocked = PLATFORMS_LOCKED.includes(webApp.platform);

	if (isLocked && !isProd) {
		isShowApp.value = true;
		return router.push({ name: 'block' });
	}
}

watchEffect(() => {
	const layout = router.currentRoute.value.meta?.layout;
	layoutName.value = layout ? `${layout}Layout` : 'MainLayout';
});

onMounted(checkPlatform);
onUnmounted(storeUser.saveUserData);
</script>
