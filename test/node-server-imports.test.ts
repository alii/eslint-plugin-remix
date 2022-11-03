import {ESLintUtils} from '@typescript-eslint/utils';
import {stripIndent} from 'common-tags';
import plugin from '../src';
import {tester} from './rule-tester';

const GOOD_CODE_CASES: ESLintUtils.ValidTestCase<never[]>[] = [
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

const BAD_CODE_CASES: ESLintUtils.InvalidTestCase<'INVALID_NODE_IMPORT', never[]>[] = [
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

tester.run('node-server-imports', plugin.rules['node-server-imports'], {
	valid: GOOD_CODE_CASES,
	invalid: BAD_CODE_CASES,
});
