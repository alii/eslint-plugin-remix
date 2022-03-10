import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
	transform: {
		'\\.(js|jsx|ts|tsx)$': '@sucrase/jest-plugin',
	},
};

export default config;
