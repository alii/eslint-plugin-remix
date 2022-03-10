import {Rule} from 'eslint';
import {INVALID_NODE_IMPORT} from './errors';
import builtinModules from 'builtin-modules/static';

export const nodeServerImports: Rule.RuleModule = {
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

				const isServer = ['ts', 'tsx', 'js', 'jsx'].some(ext =>
					filename.endsWith(`.server.${ext}`),
				);

				if (isServer) {
					return;
				}

				context.report({
					node,
					messageId: 'INVALID_NODE_IMPORT',
					suggest: [
						{
							desc: 'Move this logic to a .server.ts file and import that file instead.',
							fix(fixer) {
								return [fixer.remove(node)];
							},
						},
					],
				});
			},
		};
	},

	meta: {
		messages: {INVALID_NODE_IMPORT},
		hasSuggestions: true,
		docs: {
			description:
				'Ensures that node imports are only used in .server.{ts,js,tsx,jsx} files',
			recommended: true,
			category: 'Possible Problems',
		},
		type: 'problem',
	},
};
