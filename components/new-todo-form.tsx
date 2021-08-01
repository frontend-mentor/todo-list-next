import { FC, useContext, useState } from 'react';
import { TodoCheckmark } from './todo-checkmark';
import { ThemeContext } from './theme';
import classNames from 'classnames';

export interface NewTodoFormProps {
	onCreate: (todo: { title: string }) => void;
}

export const NewTodoForm: FC<NewTodoFormProps> = ({ onCreate }) => {
	const [title, setTitle] = useState('');
	const darkTheme = useContext(ThemeContext) === 'dark';

	return (
		<>
			<div className={classNames('container', { dark: darkTheme })}>
				<TodoCheckmark checked={false} />
				<input
					value={title}
					onChange={(e) => setTitle(e.currentTarget.value)}
					className="todo-title"
					placeholder={'Create a new todo...'}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							const value = title.trim();
							if (value.length > 0) {
								onCreate({ title: value });
								setTitle('');
							}
						}
					}}
				/>
			</div>
			<style jsx>
				{`
					.container {
						margin: -102px 24px 24px;
						padding: 14px 20px;

						display: flex;
						align-items: center;
						gap: 12px;

						border-radius: 5px;
						background-color: white;
					}

					.todo-status {
						border: 1px solid #e3e4f1;
						border-radius: 50%;

						height: 20px;
						width: 20px;
					}

					.todo-title {
						flex-grow: 1;
						height: 100%;
						margin-top: 2px;

						border: 0;
						background: none;

						color: #393a4b;
						caret-color: #3a7cfd;
						outline: none;

						font: 400 12px/1 Josefin Sans, sans-serif;
					}

					.dark.container {
						background-color: #25273d;
						color: #767992;
					}

					.dark .todo-title {
						color: #c8cbe7;
					}

					// Media
					@media all and (min-width: 540px) {
						.container {
							margin-top: -142px;
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