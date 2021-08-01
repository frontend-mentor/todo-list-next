import https from 'https';
import { NextApiRequest, NextApiResponse } from 'next';

export interface Todo {
	id: number;
	userId: number;
	title: string;
	completed: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Todo[]>) {
	https
		.get('https://jsonplaceholder.typicode.com/todos', (msg) => {
			if (msg.statusCode === 200) {
				res.status(200);
				msg.pipe(res, { end: true });
			} else {
				res.status(500).json([]);
			}
		})
		.once('error', (err) => res.status(500).end(err.toString()));
}
