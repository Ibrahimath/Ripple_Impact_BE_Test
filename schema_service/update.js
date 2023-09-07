const fs = require('fs-extra');
const path = require('path');

// Define path to the GraphQL schema file in Service 2
const typeDefsPath = path.join(__dirname, 'typeDefs.js');
const resolversPath = path.join(__dirname, 'resolvers.js');
const schemaPath = path.join(__dirname, 'models/users.js');

// Defining path to the GraphQL backend service (Service 1)
const graphqlServicePath = path.join(__dirname, '../gql_backend_service');

// Defining the path to the schema,resolvers and typedefs files in Service 1
const service1TypeDefsFilePath = path.join(graphqlServicePath, 'typeDefs/index.js');
const service1ResolversFilePath = path.join(graphqlServicePath, 'resolvers/resolvers.js');
const service1schemaFilePath = path.join(graphqlServicePath, 'models/users.js');
// Copying the typeDefs and resolvers file to the GraphQL backend service
fs.copySync(typeDefsPath, service1TypeDefsFilePath);
fs.copySync(resolversPath, service1ResolversFilePath);
fs.copySync(schemaPath, service1schemaFilePath);

console.log('GraphQL schema updated in the GraphQL service.');
