<template>
	<div
		v-for="obj in objects"
		:key="obj.x + obj.y"
		:style="stylePositionProperties(obj.x, obj.y)"
		class="banana-object"
		ref="objectsRef"
	>
		<span class="text-sm text-white drop-shadow-lg relative top-[14px] left-[10px]">
			+{{ storeUser.user.priceOneClick }}
		</span>
		<img
			:src="smallBanana"
			class="small-image w-6 drop-shadow-md"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import smallBanana from '@/assets/images/small-banana.png';
import { useUserStore } from '@/stores/useUserStore';

interface Props {
	prosition: {
		x: number;
		y: number;
	};
}
const props = defineProps<Props>();
const storeUser = useUserStore();

const clicks = ref(0);

const objects = ref<(typeof props.prosition)[]>([]);
const objectsRef = ref<HTMLElement[]>([]);

const stylePositionProperties = (x: number, y: number) => {
	const offsetY = -120;
	const offsetX = 0;

	// return { top: `${y}px`, left: `${x}px` };
	return { top: `${y + offsetY}px`, left: `${x + offsetX}px` };
};

watch(
	() => storeUser.user.bananas,
	() => {
		clicks.value++;

		// на каждом втором десятке удаляем последние 10 элементов
		if (clicks.value % 20 === 0) {
			objects.value = objects.value.splice(0, 10);
		}

		// пушим новые элементы в масив
		objects.value.push({ ...props.prosition });
	}
);
</script>

<style scoped>
.banana-object {
	position: fixed;
	pointer-events: none;
	/* transition: all 0.9s; */
	animation-name: toTopBanana;
	animation-duration: 0.9s;
	animation-timing-function: ease;
	animation-fill-mode: forwards;
}

@keyframes toTopBanana {
	0% {
		margin-top: 0;
		opacity: 1;
	}
	10% {
		margin-top: -1;
		opacity: 0.9;
	}
	20% {
		margin-top: -2;
		opacity: 0.8;
	}
	30% {
		margin-top: -3;
		opacity: 0.7;
	}
	40% {
		margin-top: -4;
		opacity: 0.6;
	}
	50% {
		margin-top: -5;
		opacity: 0.5;
	}
	60% {
		margin-top: -6;
		opacity: 0.4;
	}
	70% {
		margin-top: -7;
		opacity: 0.3;
	}
	80% {
		margin-top: -8;
		opacity: 0.2;
	}
	90% {
		margin-top: -9;
		opacity: 0.1;
	}
	100% {
		opacity: 0;
		margin-top: -10px;
		display: none;
	}
}
</style>
