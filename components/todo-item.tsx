import React, { FC, KeyboardEventHandler, useContext, useRef, useState } from 'react';
import { TodoCheckmark } from './todo-checkmark';
import { Todo } from '../pages/api/todos';
import classNames from 'classnames';
import { ThemeContext } from './theme';
import { IconCross } from './icons';

export interface TodoItemProps {
	todo: Todo;

	onUpdateTodo?(todo: Todo): void;

	onDeleteTodo?(todo: Todo): void;

	onToggleTodo?(todo: Todo): void;
}

export const TodoItem: FC<TodoItemProps> = ({ todo, onUpdateTodo, onDeleteTodo, onToggleTodo }) => {
	const [editableTodoTitle, setEditableTodoTitle] = useState(todo.title);
	const [deleteIconVisible, setDeleteIconVisible] = useState(false);
	const previousTodoTitle = useRef(todo.title);
	const darkTheme = useContext(ThemeContext) === 'dark';

	const onTodoTitleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Enter') {
			const value = editableTodoTitle.trim();
			if (value.length > 0) {
				setEditableTodoTitle('');
				previousTodoTitle.current = value;
				onUpdateTodo?.({ ...todo, title: value });
			}
		} else if (e.key.startsWith('Esc')) {
			setEditableTodoTitle(previousTodoTitle.current);
		}
	};

	return (
		<>
			<div
				className={classNames('container', { dark: darkTheme })}
				onMouseOver={() => setDeleteIconVisible(true)}
				onMouseLeave={() => setDeleteIconVisible(false)}
			>
				<TodoCheckmark checked={todo.completed} onClick={() => onToggleTodo?.(todo)} />

				<input
					className={classNames('todo-title', { completed: todo.completed })}
					value={editableTodoTitle}
					placeholder={'Create a new todo...'}
					onChange={(e) => setEditableTodoTitle(e.currentTarget.value)}
					onKeyDown={onTodoTitleKeyDown}
					onFocus={(e) => e.currentTarget.select()}
				/>
				{deleteIconVisible && <DeleteIcon todo={todo} onDeleteTodo={onDeleteTodo} />}
			</div>
			<style jsx>
				{`
					.container {
						height: 52px;
						padding: 16px 24px;

						display: flex;
						align-items: center;
						gap: 12px;

						border-bottom: 1px solid #e3e4f1;
					}

					.todo-title {
						font: 400 12px/1 'Josefin Sans', sans-serif;
						letter-spacing: -0.166667px;
						flex: 1;

						border: none;
						background: none;
						outline: none;
					}

					.todo-title.completed {
						color: #4d5067;
						text-decoration: line-through;
					}

					//==================================================
					// Dark mode

					.dark.container {
						background-color: #25273d;
						border-bottom-color: #393a4b;
					}

					.dark .todo-title {
						color: #c8cbe7;
					}

					.dark .todo-title.completed {
						color: #4d5067;
					}

					// Media
					@media all and (min-width: 540px) {
						.container {
							height: 64px;
							gap: 24px;
						}

						.todo-title {
							font-size: 18px;
						}
					}
				`}
			</style>
		</>
	);
};

const DeleteIcon: FC<{ todo: Todo; onDeleteTodo?(todo: Todo): void }> = ({ todo, onDeleteTodo }) => {
	const darkTheme = useContext(ThemeContext) === 'dark';
	let color = todo.completed ? (darkTheme ? '494C6B' : '#5B5E7E') : '';
	return <IconCross size={12} color={color} onClick={() => onDeleteTodo?.(todo)} />;
};
