import {stripIndent} from 'common-tags';
import {RuleTester} from 'eslint';
import plugin from '../src';
import {tester} from './rule-tester';

const GOOD_CODE_CASES: RuleTester.ValidTestCase[] = [
	{
		code: stripIndent`
            export function loader() {
                return new Response('OK', {
                    status: 200,
                });
            }

            export function action() {
                return new Response('OK', {
                    status: 200,
                });
            }
	    `,
		filename: 'app/routes/foo.js',
	},

	{
		code: stripIndent`
            function loader() {
                return redirect('/');
            }

            function action() {
                return redirect('/');
            }

            export {loader, action};
	    `,
		filename: 'app/routes/foo.js',
	},

	{
		code: stripIndent`
            const loader = () => {
                return redirect('/');
            }

            const a = () => {
                return redirect('/');
            }

            export {loader, a as action};
	    `,
		filename: 'app/routes/foo.js',
	},

	{
		code: stripIndent`
            export const loader = () => {
                return redirect('/');
            }

            export const action = () => {
                return redirect('/');
            }
	    `,
		filename: 'app/routes/foo.js',
	},

	{
		code: stripIndent`
            export function loader() {
                return json({status: "ok"});
            }

            export function action() {
                return json({status: "ok"});
            }

            export {action as lol};
	    `,
		filename: 'app/routes/foo.js',
	},
];

const BAD_CODE_CASES: RuleTester.InvalidTestCase[] = [
	{
		code: stripIndent`
            export const loader = () => {
                return {status: "ok"};
            }
        `,
		filename: 'app/routes/foo.js',
		errors: [
			{
				messageId: 'INVALID_NODE_IMPORT',
			},
		],
	},

	{
		code: stripIndent`
            export const loader = () => {
                return {status: "ok"};
            }

            export const action = () => {
                return {status: "ok"};
            }
        `,
		filename: 'app/routes/foo.js',
		errors: [
			{
				messageId: 'INVALID_NODE_IMPORT',
			},
		],
	},

	{
		code: stripIndent`
            const loader = () => {
                return {status: "ok"};
            }

            const action = () => {
                return {status: "ok"};
            }

            export {loader, action};
        `,
		filename: 'app/routes/foo.js',
		errors: [
			{
				messageId: 'INVALID_NODE_IMPORT',
			},
		],
	},

	{
		code: stripIndent`
            export function loader() {
                return {status: "ok"};
            }

            export function action() {
                return {status: "ok"};
            }
        `,
		filename: 'app/routes/foo.js',
		errors: [
			{
				messageId: 'INVALID_NODE_IMPORT',
			},
		],
	},

	{
		code: stripIndent`
            function loader() {
                return {status: "ok"};
            }

            function action() {
                return {status: "ok"};
            }

            export {loader, action};
        `,
		filename: 'app/routes/foo.js',
		errors: [
			{
				messageId: 'INVALID_NODE_IMPORT',
			},
		],
	},
];

tester.run(
	'data-function-no-object-return',
	plugin.rules['data-function-no-object-return'],
	{
		valid: GOOD_CODE_CASES,
		invalid: BAD_CODE_CASES,
	},
);
