import React, { FC, useContext } from 'react';
import classNames from 'classnames';
import { IconCheck } from './icons';
import { ThemeContext } from './theme';

export interface TodoCheckmarkProps {
	checked: boolean;
	size?: number;
	onClick?: () => void;
}

export const TodoCheckmark: FC<TodoCheckmarkProps> = ({ checked, size = 20, onClick }) => {
	const darkTheme = useContext(ThemeContext) === 'dark';

	return (
		<>
			<div
				onClick={onClick}
				className={classNames('container', { checked, dark: darkTheme })}
				style={{ width: size, height: size, flex: `0 0 ${size}px` }}
			>
				<div className="inner">{checked && <IconCheck />}</div>
			</div>
			<style jsx>
				{`
					.container {
						user-select: none;
						cursor: pointer;

						background: #e3e4f1;
						border-radius: 50%;

						display: flex;
						align-items: center;
						justify-content: center;
						padding: 1px;
					}

					.container.dark {
						background-color: #393a4b;
					}

					.container.checked {
						background: linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%));
					}

					.container:hover:not(.checked) {
						background: linear-gradient(135deg, #55ddff 0%, #c058f3 100%);
					}

					.inner {
						background: white;
						border-radius: 50%;

						width: 100%;
						height: 100%;

						display: flex;
						justify-content: center;
						align-items: center;
					}

					.dark .inner {
						background-color: #25273d;
					}

					.container.checked .inner {
						background: transparent;
					}
				`}
			</style>
		</>
	);
};
