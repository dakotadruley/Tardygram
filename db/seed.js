const chance = require('chance').Chance();
const User = require('../lib/models/User');
// const Post = require('../lib/models/Post');
// const User = require('../lib/models/User');

module.exports = async({ usersToCreate = 5 } = {}) => {
  const loggedInUser = await User.create({
    username: 'username100',
    password: 'password100'
  });

  const users = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: chance.name(),
    password: chance.animal()
  })));

//   await Note.create([...Array(notesToCreate)].map(() => ({
//     title: chance.profession(),
//     body: chance.sentence(),
//     author: chance.weighted([loggedInUser, ...users], [2, ...users.map(() => 1)])._id
//   })));
};
