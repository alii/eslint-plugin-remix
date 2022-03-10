import {Rule} from 'eslint';
import {NO_VARIABLES} from './errors';

export const noVariables: Rule.RuleModule = {
	create: context => {
		return {
			VariableDeclaration(node) {
				context.report({
					node,
					messageId: 'NO_VARIABLES',
				});
			},
		};
	},

	meta: {
		messages: {NO_VARIABLES},
		docs: {
			description: 'Ensures that the file has no variable declarations',
			recommended: true,
			category: 'Possible Problems',
		},
		type: 'problem',
	},
};
