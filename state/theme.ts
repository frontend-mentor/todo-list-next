import { Action } from './common';
import { AppState } from './index';

// Models
export enum SupportedThemes {
	Light = 'light',
	Dark = 'dark',
}

export type ThemeState = SupportedThemes.Light | SupportedThemes.Dark;

export interface ChangeThemeAction {
	type: '@theme/change';
	payload: {
		theme: SupportedThemes;
	};
}

// Reducer
export const themeInitialState = SupportedThemes.Light;

export function themeReducer(state = themeInitialState, action: ChangeThemeAction): ThemeState {
	switch (action.type) {
		case '@theme/change':
			return action.payload.theme;
		default:
			return state;
	}
}

// Selectors
export const selectIsDarkMode = (state: AppState) => {
	return state.theme === SupportedThemes.Dark;
};

// Actions
export const changeTheme = (theme: ThemeState): ChangeThemeAction => {
	return {
		type: '@theme/change',
		payload: { theme },
	};
};
