const {
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const EventType = require('./eventType');

module.exports = {
  type: EventType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: (root, args) => {
    return new Promise((resolve, reject) => {
      resolve({
        id: 'amit1',
        name: 'Launch Party',
        date: 'today',
      });
    });
  },
};
