// https://gist.github.com/nimaxin/758c83f66c0084e66074c19c5e1fdd13
const fixScroll = (element: HTMLElement) => {
	const num = 9999;
	const scrollable = element;

	// The preventCollapse function should be called when the scrollable content scrollTop is not equal to zero.
	function preventCollapse() {
		document.documentElement.style.marginTop = num + 'px';
		document.documentElement.style.height = window.innerHeight + num + 'px';
		document.documentElement.style.overflow = 'hidden';
		window.scrollTo(0, num);
	}

	// The allowCollapse function should be called when the scrollable content is finished being touched.
	// Do not use this function if you want to lock the mini app completely on scroll.
	function allowCollapse() {
		document.documentElement.style.marginTop = 'auto';
		document.documentElement.style.height = 'auto';
		document.documentElement.style.overflow = 'auto';
	}

	document.body.addEventListener('touchstart', function () {
		if (scrollable.scrollTop !== 0) {
			preventCollapse();
		}
	});
	scrollable.addEventListener('touchend', allowCollapse);
};

export default fixScroll;
