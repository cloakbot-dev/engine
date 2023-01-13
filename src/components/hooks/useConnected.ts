import {engineContext} from './../EngineProvider';
import React from 'react';

export default function useConnected(node: string, port: Lowercase<string>) {
	const [connected, setConnected] = React.useState(false);
	const ctx = React.useContext(engineContext);

	React.useEffect(() => {
		const l = () => {
			if (ctx) {
				setConnected(ctx?.engine.isConnected(node, port));
			}
		};

		ctx?.engine.on('changed', l);
		return () => {
			ctx?.engine.off('changed', l);
		};
	}, [ctx, node, port]);

	return connected;
}
