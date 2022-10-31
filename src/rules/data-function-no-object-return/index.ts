import {Rule} from 'eslint';
import {
	ExportNamedDeclaration,
	FunctionDeclaration,
	ReturnStatement,
	VariableDeclaration,
} from 'estree';

const DATA_FUNCTION_NAMES = ['action', 'loader'];

export const dataFunctioNoObjectReturn: Rule.RuleModule = {
	create: function (context: Rule.RuleContext): Rule.RuleListener {
		const {body} = context.getSourceCode().ast;

		const exportedDataFunctions = body
			.filter((node): node is ExportNamedDeclaration => {
				if (node.type === 'ExportNamedDeclaration') {
					return node.specifiers.some(specifier =>
						DATA_FUNCTION_NAMES.includes(specifier.exported.name),
					);
				}

				return false;
			})
			.map(_export => {
				const specifiers = _export.specifiers
					.filter(specifier =>
						DATA_FUNCTION_NAMES.includes(specifier.exported.name),
					)!
					.map(specifier => ({
						local: specifier.local.name,
						exported: specifier.exported.name,
					}));

				return {
					specifiers,
					declaration: _export.declaration ?? null,
				};
			});

		// 1: Find all exports in the file
		// 2: Filter out exports that are not data functions
		// 3: Find the declaration of said export
		// 4: Find all return statements in the declaration
		// 5: Filter out return statements that return an object

		for (const dataFunctionExport of exportedDataFunctions) {
			const declarations = dataFunctionExport.declaration
				? [dataFunctionExport.declaration]
				: dataFunctionExport.specifiers
						.map(specifier => {
							return body.filter(
								(node): node is VariableDeclaration | FunctionDeclaration => {
									return (
										node.type === 'VariableDeclaration' ||
										node.type === 'FunctionDeclaration'
									);
								},
							);
						})
						.flat();

			declarations: for (const declaration of declarations) {
				if (declaration.type === 'ClassDeclaration') {
					continue declarations;
				}

				if (declaration.type === 'FunctionDeclaration') {
					const returnStatement = declaration.body.body.find(
						(node): node is ReturnStatement => node.type === 'ReturnStatement',
					);

					if (!returnStatement || !returnStatement.argument) {
						continue declarations;
					}

					if (returnStatement.argument.type === 'ObjectExpression') {
						context.report({
							node: returnStatement,
							messageId: 'INVALID_NODE_IMPORT',
						});
					}
				} else {
					variableDeclarations: for (const variableDeclaration of declaration.declarations) {
						const init = variableDeclaration.init;

						if (
							!init ||
							!(
								init.type === 'FunctionExpression' ||
								init.type === 'ArrowFunctionExpression'
							)
						) {
							continue variableDeclarations;
						}

						const fn = init;
					}
				}
			}
		}

		return {};
	},
};
