import {dataFunctioNoObjectReturn} from './rules/data-function-no-object-return';
import {nodeServerImports} from './rules/node-server-imports';

const config = {
	rules: {
		'node-server-imports': nodeServerImports,
		'data-function-no-object-return': dataFunctioNoObjectReturn,
	},
};

export = config;
