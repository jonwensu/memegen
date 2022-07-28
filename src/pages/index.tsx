import type { NextPage } from 'next';
import { useEffect, useLayoutEffect } from 'react';
// import { useCanvas, useRect, useText } from '../hooks/useFabric';
import { fabric } from 'fabric';
import { useCanvas, useText } from '../hooks/useFabric';

const Home: NextPage = () => {
	const { addText } = useCanvas('canvas', {
		height: 600,
		width: 800,
		// fireRightClick: true,
		// fireMiddleClick: true,
		stopContextMenu: true,
		backgroundColor: 'red',
		backgroundImage: undefined,
		selection: true,

		texts: [{ text: 'test123123' }, { text: 'zxczxczxc' }],
	});
	// const text = useText('tesasdt');
	// useLayoutEffect(() => {
	// 	const canvas = new fabric.Canvas('canvas', {
	// 		height: 600,
	// 		width: 800,
	// 		fireRightClick: true,
	// 		fireMiddleClick: true,
	// 		stopContextMenu: true,
	// 		backgroundColor: undefined,
	// 		backgroundImage: undefined,
	// 	});
	// 	canvas.requestRenderAll();
	// 	const text = new fabric.Text('zzz');
	// 	canvas.add(text);
	// 	canvas.add(text);
	// }, []);

	return (
		<>
			<canvas id='canvas' />
			<button onClick={() => addText('123123123123')}>Click me</button>
		</>
	);
};

export default Home;
