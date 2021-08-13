import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import { TodoItem } from './todo-item';
import { TodoSummary } from './todo-summary';
import { NewTodoForm } from './new-todo-form';
import {
	fetchTodosFulfilled,
	fetchTodosPending,
	fetchTodosRejected,
	selectFetchTodosState,
	selectFilteredTodos,
	selectIsDarkMode,
	useAppDispatch,
	useAppSelector,
} from '../state';
import { TodoListFilters } from './todo-list-filters';
import { Loader } from './loader';

export const TodoList: FC = () => {
	const dispatch = useAppDispatch();

	const filteredTodos = useAppSelector(selectFilteredTodos);
	const darkTheme = useAppSelector(selectIsDarkMode);
	const fetchState = useAppSelector(selectFetchTodosState);

	const [inlineFilterVisible, setInlineFilterVisible] = useState(false);

	useEffect(function fetchTodos() {
		const requestController = new AbortController();

		if (process.env.LIVE_TODOS) {
			dispatch(fetchTodosPending());

			fetch('/api/todos', { signal: requestController.signal })
				.then((response) =>
					response.ok ? response.json() : Promise.reject(new Error(`Request failed. Http status: ${response.status}`))
				)
				.then((todos) => dispatch(fetchTodosFulfilled(todos.slice(0, 28))))
				.catch((err) => {
					console.error(err);
					dispatch(fetchTodosRejected(err));
				});
		}
		return () => requestController.abort();
	}, []);

	useEffect(function toggleInlineFilters() {
		const media = matchMedia('(min-width: 540px)');
		const onMediaChange = (e: MediaQueryListEvent) => setInlineFilterVisible(e.matches);
		media.addEventListener('change', onMediaChange);
		setInlineFilterVisible(media.matches);
		return () => media.removeEventListener('change', onMediaChange);
	}, []);

	return (
		<>
			{fetchState.loading && <Loader />}
			<NewTodoForm />
			<div className={classNames('container', { dark: darkTheme })}>
				<div className="scroll-container">
					{filteredTodos.map((todo) => (
						<TodoItem key={todo.id} todo={todo} />
					))}
				</div>
				<TodoSummary filterVisible={inlineFilterVisible} />
			</div>
			{!inlineFilterVisible && <TodoListFilters />}

			<div className="drag-hint">Drag and drop to reorder list</div>
			<style jsx>
				{`
					.container {
						margin: 0 24px 16px;

						min-height: 100px;

						overflow-x: hidden;
						overflow-y: auto;

						background-color: white;

						border-radius: 5px;
						box-shadow: 0 35px 50px -15px rgba(194, 195, 214, 0.5);
					}

					.scroll-container {
						overflow-y: auto;
						max-height: calc(100vh - 380px);
					}

					.drag-hint {
						margin-top: 49px;

						color: #9495a5;
						text-align: center;
						font: 400 14px/1 Josefin Sans, sans-serif;
					}

					// Dark theme
					.dark.container {
						box-shadow: none;
						background-color: #25273d;
					}

					.dark .drag-hint {
						color: #5b5e7e;
					}
				`}
			</style>
		</>
	);
};
