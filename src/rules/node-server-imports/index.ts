import {ESLintUtils} from '@typescript-eslint/utils';
import builtinModules from 'builtin-modules/static';
import {INVALID_NODE_IMPORT, MOVE_TO_SERVER_FILE} from './errors';

export const nodeServerImports = ESLintUtils.RuleCreator.withoutDocs({
	create: context => {
		return {
			ImportDeclaration(node) {
				const value = node.source.value;

				if (typeof value !== 'string') {
					return;
				}

				const isBuiltin = builtinModules.includes(value);

				if (!isBuiltin) {
					return;
				}

				const filename = context.getFilename();

				const isServer = ['ts', 'tsx', 'js', 'jsx'].some(ext => filename.endsWith(`.server.${ext}`));

				if (isServer) {
					return;
				}

				context.report({
					node,
					messageId: 'INVALID_NODE_IMPORT',
					suggest: [
						{
							messageId: 'MOVE_TO_SERVER_FILE',
							fix: fixer => {
								return [fixer.remove(node)];
							},
						},
					],
				});
			},
		};
	},

	meta: {
		messages: {
			INVALID_NODE_IMPORT,
			MOVE_TO_SERVER_FILE,
		},
		hasSuggestions: true,
		docs: {
			description: 'Ensures that node imports are only used in .server.{ts,js,tsx,jsx} files',
			recommended: 'error',
		},
		type: 'problem',
		schema: [],
	},
	defaultOptions: [],
});
