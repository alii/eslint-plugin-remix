import {RuleTester} from 'eslint';

export const tester = new RuleTester({
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
});
