import {stripIndent} from 'common-tags';
import {RuleTester} from 'eslint';
import plugin from '../src';

const rules = new RuleTester({
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
});

const GOOD_CODE_CASES: RuleTester.ValidTestCase[] = [
	{
		code: stripIndent`
            import path from 'path';
		    path.join('foo', 'bar');
	    `,
		filename: 'foo.server.js',
	},

	{
		code: stripIndent`
            import fs from 'fs';
		    fs.writeFileSync('foo', 'bar');
	    `,
		filename: 'foo.server.js',
	},
];

const BAD_CODE_CASES: RuleTester.InvalidTestCase[] = [
	{
		code: stripIndent`
            import path from 'path';
            path.join('foo', 'bar');
        `,
		filename: 'foo.client.js',
		errors: [
			{
				messageId: 'INVALID_NODE_IMPORT',
			},
		],
	},

	{
		code: stripIndent`
            import fs from 'fs';
		    fs.writeFileSync('foo', 'bar');
        `,
		filename: 'foo.client.js',
		errors: [
			{
				messageId: 'INVALID_NODE_IMPORT',
			},
		],
	},
];

rules.run('node-server-imports', plugin.rules['node-server-imports'], {
	valid: GOOD_CODE_CASES,
	invalid: BAD_CODE_CASES,
});
