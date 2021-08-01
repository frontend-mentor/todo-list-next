import React, { FC, useContext } from 'react';
import classNames from 'classnames';
import { ThemeContext } from './theme';

export type FilterState = 'all' | 'active' | 'completed';

const supportedFilters: { label: string; filter: FilterState }[] = [
	{ label: 'All', filter: 'all' },
	{ label: 'Active', filter: 'active' },
	{ label: 'Completed', filter: 'completed' },
];

export const TodoListFilters: FC<{ filter: FilterState; onFilter?(filter: FilterState): void }> = ({
	filter,
	onFilter,
}) => {
	const darkTheme = useContext(ThemeContext) === 'dark';
	return (
		<>
			<div className={classNames('container', { dark: darkTheme })}>
				{supportedFilters.map((item) => (
					<button
						key={item.filter}
						className={classNames({ active: filter === item.filter })}
						onClick={() => onFilter?.(item.filter)}
					>
						{item.label}
					</button>
				))}
			</div>
			<style jsx>
				{`
					.container {
						display: flex;
						align-items: center;
						justify-content: center;
						gap: 18px;

						margin: 0 24px;
						height: 48px;

						background-color: white;

						border-radius: 5px;
						box-shadow: 0 35px 50px -15px rgba(194, 195, 214, 0.5);
					}

					.container button {
						border: none;
						outline: none;
						background: none;
						cursor: pointer;
						padding: 0;

						font: 700 14px/1 'Josefin Sans';
						color: #9495a5;
					}

					.container button:not(.active):hover {
						color: #494c6b;
					}

					.container button.active {
						color: #3a7cfd;
					}

					// Dark theme

					.dark.container {
						background-color: #25273d;
						box-shadow: none;
					}

					.dark.container button:not(.active):hover {
						color: #e3e4f1;
					}

					.dark .items-remaining,
					.dark .clear-completed {
						color: #5b5e7e;
					}
				`}
			</style>
		</>
	);
};
