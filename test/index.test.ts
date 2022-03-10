import {stripIndent} from 'common-tags';
import {RuleTester} from 'eslint';
import plugin from '../src';

import {NO_VARIABLES} from '../src/rules/example/errors';

const rules = new RuleTester({
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
});

const GOOD_CODE_CASES = [
	stripIndent`
		console.log('Look ma, no variables!');
	`,
];

const BAD_CODE_CASES = [
	stripIndent`
		const name = "";
		console.log('Look ma, variables!');
	`,
];

rules.run('no-variables', plugin.rules['no-variables'], {
	valid: GOOD_CODE_CASES.map(code => ({code})),

	invalid: BAD_CODE_CASES.map(code => ({
		code,
		errors: [
			{
				message: NO_VARIABLES,
			},
		],
	})),
});
