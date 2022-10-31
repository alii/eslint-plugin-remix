import {nodeServerImports} from './rules/node-server-imports';

const config = {
	rules: {
		'node-server-imports': nodeServerImports,
		'data-function-no-object-return': null,
	},
};

export = config;
