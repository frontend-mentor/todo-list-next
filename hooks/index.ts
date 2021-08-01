import { useEffect, useState } from 'react';

export function usePrefersDarkMode() {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const onMediaChange = (e: MediaQueryListEvent) => setDarkMode(e.matches);
		const media = window.matchMedia('(prefers-color-scheme: dark)');
		media.addEventListener('change', onMediaChange);

		setDarkMode(media.matches);

		return () => media?.removeEventListener('change', onMediaChange);
	}, []);

	return darkMode;
}

export function useDesktopResolution() {
	const [desktopMode, setDesktopMode] = useState(false);

	useEffect(function watchMediaDesktopResolution() {
		const media = window.matchMedia('(min-width: 540px)');
		const onMediaChange = (e: MediaQueryListEvent) => setDesktopMode(e.matches);
		media.addEventListener('change', onMediaChange);

		setDesktopMode(media.matches);

		return () => media.removeEventListener('change', onMediaChange);
	}, []);

	return desktopMode;
}
