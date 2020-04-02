const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
// const User = require('../lib/models/User');

module.exports = async({ usersToCreate = 5, postsToCreate = 10 } = {}) => {
  const loggedInUser = await User.create({
    username: 'username100',
    password: 'password100'
  });

  const users = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: chance.name(),
    password: chance.animal()
  })));

  await Post.create([...Array(postsToCreate)].map(() => ({
    photoURL: chance.url(),
    caption: chance.sentence(),
    tags: [chance.word()],
    author: chance.weighted([loggedInUser, ...users], [2, ...users.map(() => 1)])._id
  })));
};
