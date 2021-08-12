import React, { FC } from 'react';
import { IconMoon, IconSun } from './icons';
import { changeTheme, selectIsDarkMode, SupportedThemes, useAppDispatch, useAppSelector } from '../state';
import { useDesktopResolution } from '../hooks';

export const ThemeSwitch: FC = () => {
	const dispatch = useAppDispatch();
	const darkMode = useAppSelector(selectIsDarkMode);
	const iconSize = useDesktopResolution() ? 26 : 20;

	const onToggleTheme = () => {
		dispatch(changeTheme(darkMode ? SupportedThemes.Light : SupportedThemes.Dark));
	};

	return (
		<>
			<button className="theme-switch" onClick={onToggleTheme}>
				{darkMode ? <IconSun size={iconSize} /> : <IconMoon size={iconSize} />}
			</button>
			<style jsx>
				{`
					.theme-switch {
						border: none;
						background: none;
						outline: none;
						cursor: pointer;
						padding: 0;
						line-height: 0;
					}
				`}
			</style>
		</>
	);
};
