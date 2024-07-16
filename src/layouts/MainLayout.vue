<template>
	<main class="mx-auto">
		<div class="min-h-screen max-h-screen flex flex-col items-center justify-between">
			<TheHeader />

			<section class="overflow-x-auto w-full flex grow">
				<RouterView />
			</section>

			<TheFooter />
		</div>
	</main>
</template>

<script lang="ts" setup>
import TheFooter from '@/components/TheFooter.vue';
import TheHeader from '@/components/TheHeader.vue';
</script>
