import React, { FC, useContext } from 'react';
import { ThemeContext } from './theme';
import classNames from 'classnames';
import { FilterState, TodoListFilters } from './todo-list-filters';

export const TodoSummary: FC<{
	itemsRemaining: number;
	onClearCompleted?(): void;
	filterVisible: boolean;
	filter: FilterState;
	onFilter?(filter: FilterState): void;
}> = ({ itemsRemaining, onClearCompleted, filterVisible, filter, onFilter }) => {
	const darkTheme = useContext(ThemeContext) === 'dark';

	return (
		<>
			<div className={classNames('container', { dark: darkTheme })}>
				<div className="items-remaining">{itemsRemaining} items left</div>
				{filterVisible && <TodoListFilters filter={filter} onFilter={onFilter} />}
				<button className="clear-completed" onClick={() => onClearCompleted?.()}>
					Clear Completed
				</button>
			</div>
			<style jsx>
				{`
					.container {
						display: flex;
						justify-content: space-between;
						align-items: center;

						padding: 0 24px;
						height: 50px;
					}

					.items-remaining,
					.clear-completed {
						color: #9495a5;
						font: normal 14px/1 Josefin Sans, sans-serif;
						white-space: nowrap;
					}

					.clear-completed {
						border: none;
						outline: none;
						cursor: pointer;
						padding: 0;

						background: none;

						font-size: 14px;
						line-height: 1;
					}

					.clear-completed:hover {
						color: #494c6b;
					}

					// Dark theme

					.dark.container {
						background-color: #25273d;
					}

					.dark .items-remaining,
					.dark .clear-completed {
						color: #5b5e7e;
					}

					.dark .clear-completed:hover {
						color: #e3e4f1;
					}
				`}
			</style>
		</>
	);
};
