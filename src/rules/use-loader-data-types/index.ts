import {AST_NODE_TYPES, ESLintUtils, TSESTree} from '@typescript-eslint/utils';

export const useLoaderDataTypes = ESLintUtils.RuleCreator.withoutDocs({
	create: context => {
		return {
			'CallExpression[callee.name="useLoaderData"]'(
				node: TSESTree.CallExpression,
			) {
				if (!node.typeParameters) {
					context.report({
						suggest: [
							{
								messageId: 'suggestMissingFix',
								fix: fixer => [
									fixer.insertTextAfter(node.callee, '<typeof loader>'),
								],
							},
						],
						messageId: 'missing',
						node,
					});
					return;
				}

				const {typeParameters} = node;

				if (
					typeParameters.params.length !== 1 ||
					getTypeParameterTypeQueryName(typeParameters.params[0]) !== 'loader'
				) {
					context.report({
						suggest: [
							{
								messageId: 'suggestIncorrectFix',
								fix: fixer => [
									fixer.replaceTextRange(
										typeParameters.range,
										'<typeof loader>',
									),
								],
							},
						],
						messageId: 'incorrect',
						node,
					});
				}
			},
		};
	},
	defaultOptions: [],
	meta: {
		messages: {
			incorrect:
				'Prefer a `<typeof loader>` type parameter to safely type this call.',
			missing:
				'Prefer using an explicit `<typeof loader>` type parameter to safely type this call.',
			suggestIncorrectFix:
				'Use `<typeof loader> type parameter to safely type this call.',
			suggestMissingFix:
				'Add a `<typeof loader> type parameter to safely type this call.',
		},
		hasSuggestions: true,
		docs: {
			description:
				'Ensures that useLoaderData calls have proper type information.',
			recommended: 'warn',
		},
		type: 'problem',
		schema: [],
	},
});
function getTypeParameterTypeQueryName(node: TSESTree.TypeNode) {
	return (
		node.type === AST_NODE_TYPES.TSTypeQuery &&
		node.exprName.type === AST_NODE_TYPES.Identifier &&
		node.exprName.name
	);
}
