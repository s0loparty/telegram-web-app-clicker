import { createWebHashHistory, createRouter } from 'vue-router';

import IndexView from '@/views/index.vue';
import BoostsView from '@/views/boosts.vue';
import OnlyintelegramView from '@/views/onlyintelegram.vue';

import { useWebApp } from 'vue-tg';

const routes = [
	{ path: '/', name: 'main', component: IndexView, meta: { layout: 'Main' } },
	{ path: '/boosts', name: 'boosts', component: BoostsView, meta: { layout: 'Main' } },
	{
		path: '/block',
		name: 'block',
		component: OnlyintelegramView,
		meta: { layout: 'Block' },
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

router.beforeEach(async (to, _, next) => {
	const webApp = useWebApp();
	const isAuthenticated = !!webApp.initDataUnsafe?.user;

	if (!isAuthenticated && to.name !== 'block') {
		return next({ name: 'block' });
	}

	next();
});

export default router;
