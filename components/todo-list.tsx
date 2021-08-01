import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import { Todo } from '../pages/api/todos';
import { TodoItem } from './todo-item';
import { TodoSummary } from './todo-summary';
import { FilterState, TodoListFilters } from './todo-list-filters';
import { ThemeContext } from './theme';
import { NewTodoForm } from './new-todo-form';

export const TodoList: FC<{}> = () => {
	const [todos, setTodos] = useState(() => [
		{
			userId: 1,
			id: 1,
			title: 'Complete online JavaScript course',
			completed: true,
		},
		{
			userId: 1,
			id: 2,
			title: 'Jog around the park 3x',
			completed: false,
		},
		{
			userId: 1,
			id: 3,
			title: '10 minutes meditation',
			completed: false,
		},
		{
			userId: 1,
			id: 4,
			title: 'Read for 1 hour',
			completed: false,
		},
		{
			userId: 1,
			id: 5,
			title: 'Pick up groceries',
			completed: false,
		},
		{
			userId: 1,
			id: 6,
			title: 'Complete Todo App on Frontend Mentor',
			completed: false,
		},
	]);
	const [filter, setFilter] = useState<FilterState>('all');
	const itemsRemaining = useMemo(() => todos.reduce((count, todo) => count + (todo.completed ? 0 : 1), 0), [todos]);
	const filteredTodos = useMemo(() => {
		return filter === 'all'
			? todos
			: todos.filter((todo) => (filter === 'completed' && todo.completed) || (filter === 'active' && !todo.completed));
	}, [todos, filter]);
	const darkTheme = useContext(ThemeContext) === 'dark';

	const onUpdateFilter = (filter: FilterState) => setFilter(filter);
	const onUpdateTodo = (todo: Todo) =>
		setTodos(
			todos.map((item) => (item.id === todo.id ? { ...item, title: todo.title, complete: todo.completed } : item))
		);
	const onToggleTodo = (todo: Todo) =>
		setTodos(todos.map((item) => (item.id === todo.id ? { ...item, completed: !item.completed } : item)));
	const onDeleteTodo = (todo: Todo) => setTodos(todos.filter((item) => item.id !== todo.id));
	const onClearCompleted = () => setTodos(todos.filter((todo) => !todo.completed));

	// useEffect(function fetchTodos() {
	// 	const requestController = new AbortController();
	// 	requestController.signal.addEventListener('abort', (e) => console.log('Received', e));
	//
	// 	fetch('/api/todos', { signal: requestController.signal })
	// 		.then((response) => (response.ok ? response.json() : []))
	// 		.then((items) => setTodos(items.slice(0, 25)))
	// 		.catch((err) => {
	// 			console.error('Failed', err);
	// 		});
	//
	// 	return () => requestController.abort();
	// }, []);

	const [inlineFilterVisible, setInlineFilterVisible] = useState(false);

	useEffect(function toggleInlineFilters() {
		const media = matchMedia('(min-width: 540px)');
		const onMediaChange = (e: MediaQueryListEvent) => setInlineFilterVisible(e.matches);
		media.addEventListener('change', onMediaChange);
		setInlineFilterVisible(media.matches);
		return () => media.removeEventListener('change', onMediaChange);
	}, []);

	return (
		<>
			<NewTodoForm
				onCreate={({ title }) =>
					setTodos([{ id: Math.round(Math.random() * 10000), userId: -1, title, completed: false }, ...todos])
				}
			/>
			<div className={classNames('container', { dark: darkTheme })}>
				<div className="scroll-container">
					{filteredTodos.map((todo) => (
						<TodoItem
							key={todo.id}
							todo={todo}
							onUpdateTodo={onUpdateTodo}
							onDeleteTodo={onDeleteTodo}
							onToggleTodo={onToggleTodo}
						/>
					))}
				</div>
				<TodoSummary
					filterVisible={inlineFilterVisible}
					filter={filter}
					onFilter={onUpdateFilter}
					itemsRemaining={itemsRemaining}
					onClearCompleted={onClearCompleted}
				/>
			</div>
			{!inlineFilterVisible && <TodoListFilters filter={filter} onFilter={onUpdateFilter} />}

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
						max-height: calc(100vh - 360px);
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
