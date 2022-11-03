import {nodeServerImports} from './rules/node-server-imports';
import {useLoaderDataTypes} from './rules/use-loader-data-types';

const config = {
	rules: {
		'use-loader-data-types': useLoaderDataTypes,
		'node-server-imports': nodeServerImports,
	},
};

export = config;
