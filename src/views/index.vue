<template>
	<section class="relative grow flex items-center justify-center">
		<XyzTransition
			appear
			xyz="fade rotate-right ease-out-back"
			mode="in-out"
		>
			<img
				:src="imageBanana"
				alt="banana"
				:class="bananaImageClasses"
				@click="handleClick"
			/>
		</XyzTransition>
		<BananaObjectEffect :prosition="effectPosition" />
	</section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import useSoundEffects from '@/composable/useSoundEffects';
import BananaObjectEffect from '@/components/BananaObjectEffect.vue';
import imageBanana from '@/assets/images/banana.png';

const storeUser = useUserStore();
const soundEffects = useSoundEffects();

const scaleClasses = ref('');
const bananaImageClasses = computed(() => {
	return ['mx-auto w-[80%] max-w-[500px] duration-[100ms]', scaleClasses.value];
});

const effectPosition = reactive({ x: 0, y: 0 });

const handleClick = (ev: any): void => {
	effectPosition.x = ev.clientX;
	effectPosition.y = ev.clientY;

	storeUser.addBananasPerClick();

	soundEffects.playBananaClick();

	const element = ev.target as Element;

	if (element.classList.contains('scale-125')) {
		element.classList.remove('scale-125');
	}

	scaleClasses.value = 'scale-125';
	setTimeout(() => (scaleClasses.value = 'scale-100'), 50);
};
</script>
