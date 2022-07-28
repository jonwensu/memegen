import {
	useRef,
	useEffect,
	useState,
	useLayoutEffect,
	useCallback,
} from 'react';
import { fabric } from 'fabric';
import {
	ICanvasOptions,
	IRectOptions,
	IText,
	ITextboxOptions,
	TextOptions,
} from 'fabric/fabric-impl';

type TText = ITextboxOptions & { text: string };

type CanvasOptions = ICanvasOptions & {
	texts?: TText[];
};

export function useCanvas(id: string, options: CanvasOptions = {}) {
	const canvas = useRef<fabric.Canvas>();
	const [texts, setTexts] = useState<TText[]>(options?.texts || []);
	useLayoutEffect(() => {
		canvas.current = new fabric.Canvas(id, {
			renderOnAddRemove: true,
			stateful: true,
			...options,
		});
		texts.forEach(({ text, ...opts }) => addText(text, opts));
		canvas.current.requestRenderAll();

		return () => {
			canvas.current?.dispose();
		};
	}, []);

	const addText = (initialText = '', options?: ITextboxOptions) => {
		const defaultOpts: ITextboxOptions = { editable: true };
		canvas.current?.add(
			new fabric.Textbox(initialText, { ...defaultOpts, ...options })
		);
		// canvas.current?.requestRenderAll();
		// console.log(canvas.current?.requestRenderAll);
	};

	return { canvas, addText };
}
export function useRect(options?: IRectOptions) {
	const [instance, setInstance] = useState(new fabric.Rect(options));

	useEffect(() => {
		setInstance(new fabric.Rect(options));
	}, [options]);

	return instance;
}

export function useText(initialText = '', options: ITextboxOptions = {}) {
	const defaultOpts: ITextboxOptions = { editable: true };
	const instance = useRef(
		new fabric.Textbox(initialText, { ...defaultOpts, ...options })
	);
	return instance.current;
}
