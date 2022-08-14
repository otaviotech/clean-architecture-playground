module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  const toCamelCase = plop.getHelper('camelCase');

  plop.setGenerator('usecase', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'How should we name this usecase?',
      },
      {
        type: 'checkbox',
        name: 'features',
        choices: ['Repository', 'Controller', 'Presenter', 'Route'],
        message: 'Would you like to also generate any of these?',
        filter: function (input, answers) {
          input.forEach((feat) => {
            answers[toCamelCase('include' + feat)] = true;
          });

          return answers;
        },
      },
      {
        type: 'input',
        name: 'prismaEntity',
        message: 'How should we name the Prisma entity?',
        default: 'entity',
        when: (answers) => answers.includeRepository,
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/application/usecases/{{camelCase name}}/{{camelCase name}}.ts',
        templateFile: 'templates/application/usecases/usecase.ts.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/application/ports/usecases/{{camelCase name}}.ts',
        templateFile: 'templates/application/ports/usecases/usecase.ts.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/application/usecases/{{camelCase name}}/index.ts',
        templateFile: 'templates/application/usecases/index.ts.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/application/ports/repositories/{{camelCase name}}.ts',
        templateFile:
          'templates/application/ports/repositories/repository.ts.hbs',
        skipIfExists: true,
        skip: (answers) =>
          !answers.includeRepository && "[SKIPPED] Repository wasn't selected",
      },
      {
        type: 'add',
        path: 'src/external/database/postgres/prisma/repositories/{{camelCase name}}.ts',
        templateFile:
          'templates/external/database/postgres/prisma/repositories/repository.ts.hbs',
        skipIfExists: true,
        skip: (answers) =>
          !answers.includeRepository && "[SKIPPED] Repository wasn't selected",
      },
      {
        type: 'add',
        path: 'src/infra/web/controllers/{{camelCase name}}.ts',
        templateFile: 'templates/infra/web/controllers/controller.ts.hbs',
        skipIfExists: true,
        skip: (answers) =>
          !answers.includeController && "[SKIPPED] Controller wasn't selected",
      },
    ],
  });
};
