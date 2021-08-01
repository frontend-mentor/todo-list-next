import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { TodoList } from '../components/todo-list';
import { ThemeContext } from '../components/theme';
import bgMobileDark from '../assets/bg-mobile-dark.jpg';
import bgMobileLight from '../assets/bg-mobile-light.jpg';
import bgDesktopDark from '../assets/bg-desktop-dark.jpg';
import bgDesktopLight from '../assets/bg-desktop-light.jpg';
import { IconMoon, IconSun } from '../components/icons';
import { useDesktopResolution, usePrefersDarkMode } from '../hooks';

export default function Home() {
	const [darkMode, setDarkMode] = useState(false);
	const darkModePreferred = usePrefersDarkMode();
	const desktopMode = useDesktopResolution();

	useEffect(() => setDarkMode(darkModePreferred), [darkModePreferred]);

	return (
		<>
			<ThemeContext.Provider value={darkMode ? 'dark' : 'light'}>
				<Head>
					<title>{'Todo App'}</title>
					<meta name="description" content="Todo App" />
					<link rel="icon" href="/favicon-32x32.png" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'annonymous'} />
					<link
						href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<div className={classNames('container', { dark: darkMode })}>
					<header className="header">
						<div className="title-wrapper">
							<span className="title">TODO</span>
							<button className="theme-switch" onClick={() => setDarkMode((prevState) => !prevState)}>
								{darkMode ? (
									<IconSun size={desktopMode ? 26 : 20} color="white" />
								) : (
									<IconMoon size={desktopMode ? 26 : 20} />
								)}
							</button>
						</div>
					</header>
					<main className="todo-list-wrapper">
						<TodoList />
					</main>
				</div>
			</ThemeContext.Provider>
			<style jsx>
				{`
					.container {
						max-width: 1440px;
						min-height: 100vh;

						margin: 0 auto;

						background-color: #fafafa;
					}

					.todo-list-wrapper {
						max-width: 540px;
						margin: 0 auto;
					}

					.title-wrapper {
						margin: 48px 24px 40px;

						display: flex;
						justify-content: space-between;
						align-items: center;
					}

					.title-wrapper .title {
						font-size: 20px;
						font-weight: 700;
						line-height: 100%;
						letter-spacing: 12px;
					}

					.theme-switch {
						border: none;
						background: none;
						outline: none;
						cursor: pointer;
						padding: 0;
						line-height: 0;
					}

					.header {
						display: flex;
						flex-direction: column;
						height: 200px;

						background: transparent url(${bgMobileLight.src}) 0 0 / cover no-repeat;
						color: white;
					}

					.dark .header {
						background-image: url(${bgMobileDark.src});
					}

					.dark.container {
						background-color: #161721;
					}

					@media all and (min-width: 540px) {
						.header {
							height: 300px;
							background: transparent url(${bgDesktopLight.src}) 0 0 / cover no-repeat;
						}

						.dark .header {
							background-image: url(${bgDesktopDark.src});
						}

						.title-wrapper {
							width: 540px;

							margin-left: auto;
							margin-right: auto;
							margin-top: 70px;

							display: flex;
							justify-content: space-between;
							padding: 0 24px;
						}

						.title-wrapper .title {
							font-size: 40px;
							letter-spacing: 15px;
						}
					}
				`}
			</style>
		</>
	);
}
