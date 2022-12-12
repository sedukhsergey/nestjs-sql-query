1. To generate and download a Swagger JSON file, navigate to http://localhost:5000/api-json
2. Swagger documentation is available under http://localhost:5000/api


3. To create migration type npm run typeorm:generate-migration --name=name_of_migration 
For example `npm run typeorm:generate-migration --name=PostCreationDate `
4. Then import this migration in typeOrm.config.ts file in migration array
5. Then type `npm run typeorm:run-migrations`
6. To revert migration type `run npm run typeorm:revert-migration`
7. If you want to create migration manually type `npm run typeorm:create-migration --name=StudentsTable`

