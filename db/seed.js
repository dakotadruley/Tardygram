const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
const Comment = require('../lib/models/Comment');

module.exports = async({ usersToCreate = 5, postsToCreate = 10, commentsToCreate = 5 } = {}) => {
  const loggedInUser = await User.create({
    username: 'username100',
    password: 'password100'
  });

  const users = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: chance.name(),
    password: chance.animal()
  })));

  const post = await Post.create([...Array(postsToCreate)].map(() => ({
    photoURL: chance.url(),
    caption: chance.sentence(),
    tags: [chance.word()],
    author: chance.weighted([loggedInUser, ...users], [2, ...users.map(() => 1)])._id
  })));

  await Comment.create([...Array(commentsToCreate)].map(() => ({
    comment: chance.sentence(),
    commentBy: chance.pickone(users),
    post: chance.pickone(post)
  })));
};
