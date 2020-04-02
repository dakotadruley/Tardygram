const { getAgent, getUser, getPosts, getPost } = require('../db/data-helpers');

describe('posts routes', () => {
  it('creates a post', async() => {
    const user = await getUser({ username: 'username100' });

    return getAgent()
      .post('/api/v1/posts')
      .send({
        photoURL: 'my title',
        caption: 'my body',
        tags: ['tag1', 'tag2', 'tag3'],
        author: user._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          photoURL: expect.any(String),
          caption: expect.any(String),
          tags: ['tag1', 'tag2', 'tag3'],
          author: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets all posts', async() => {
    const posts = await getPosts();

    return getAgent()
      .get('/api/v1/posts')
      .then(res => {
        expect(res.body).toEqual(posts);
      });
  });

  it('gets a post by id', async() => {
    const post = await getPost({ author: user._id });
    const user = await getUser({ username: 'username100' });
    // add comments 
    return getAgent()
      .get(`/api/v1/posts/${post._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...post,
          author: user._id
        });
      });
  });

  it('updates a post', async() => {
    const user = await getUser({ username: 'username100' });
    const post = await getPost({ author: user._id });

    return getAgent()
      .patch(`/api/v1/posts/${post._id}`)
      .send({ caption: 'My cool post' })
      .then(res => {
        expect(res.body).toEqual({
          ...post,
          caption: 'My cool post'
        });
      });
  });

  it('deletes a post', async() => {
    const user = await getUser({ username: 'username100' });
    const post = await getPost({ author: user._id });

    return getAgent()
      .delete(`/api/v1/posts/${post._id}`)
      .then(res => {
        expect(res.body).toEqual(post);
      });
  });
});
