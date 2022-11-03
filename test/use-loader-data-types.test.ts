import {ESLintUtils} from '@typescript-eslint/utils';
import plugin from '../src';

const ruleTester = new ESLintUtils.RuleTester({
	parser: '@typescript-eslint/parser',
});

ruleTester.run('use-loader-data-types', plugin.rules['use-loader-data-types'], {
	valid: [
		'useEffect()',
		'useState()',
		'useOtherLoader()',
		'userLoaderData<typeof loader>()',
	],
	invalid: [
		{
			code: 'useLoaderData()',
			errors: [
				{
					messageId: 'missing',
					suggestions: [
						{
							messageId: 'suggestMissingFix',
							output: 'useLoaderData<typeof loader>()',
						},
					],
				},
			],
		},
		{
			code: 'useLoaderData<other>()',
			errors: [
				{
					messageId: 'incorrect',
					suggestions: [
						{
							messageId: 'suggestIncorrectFix',
							output: 'useLoaderData<typeof loader>()',
						},
					],
				},
			],
		},
		{
			code: 'useLoaderData<typeof other>()',
			errors: [
				{
					messageId: 'incorrect',
					suggestions: [
						{
							messageId: 'suggestIncorrectFix',
							output: 'useLoaderData<typeof loader>()',
						},
					],
				},
			],
		},
	],
});
