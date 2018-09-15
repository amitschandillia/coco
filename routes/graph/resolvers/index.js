const { fileLoader, mergeResolvers } = require('merge-graphql-schemas');

const resolversArray = fileLoader(__dirname, { extensions: ['.gql'] });

module.exports = mergeResolvers(resolversArray);
