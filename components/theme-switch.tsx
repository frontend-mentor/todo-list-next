import React, { FC } from 'react';
import { IconMoon, IconSun } from './icons';
import { changeTheme, selectIsDarkMode, SupportedThemes, useAppDispatch, useAppSelector } from '../state';

export const ThemeSwitch: FC = () => {
	const dispatch = useAppDispatch();
	const darkMode = useAppSelector(selectIsDarkMode);

	const onToggleTheme = () => {
		dispatch(changeTheme(darkMode ? SupportedThemes.Light : SupportedThemes.Dark));
	};

	return (
		<>
			<button className="theme-switch" onClick={onToggleTheme}>
				<div className="icon">{darkMode ? <IconSun /> : <IconMoon />}</div>
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

					.theme-switch .icon {
						width: 20px;
						height: 20px;
					}

					@media all and (min-width: 592px) {
						.theme-switch .icon {
							width: 26px;
							height: 26px;
						}
					}
				`}
			</style>
		</>
	);
};
