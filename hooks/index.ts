import { useEffect, useState } from 'react';

export function useDesktopResolution() {
	const [desktopMode, setDesktopMode] = useState(false);

	useEffect(function watchMediaDesktopResolution() {
		const media = window.matchMedia('(min-width: 592px)');
		const onMediaChange = (e: MediaQueryListEvent) => setDesktopMode(e.matches);
		media.addEventListener('change', onMediaChange);

		setDesktopMode(media.matches);

		return () => media.removeEventListener('change', onMediaChange);
	}, []);

	return desktopMode;
}
