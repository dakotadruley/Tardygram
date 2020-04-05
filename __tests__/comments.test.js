const { getUser, getAgent, getPost, getComment } = require('../db/data-helpers');

describe('comment routes', () => {
  it('creates a new comment', async() => {
    const user = await getUser({ username: 'username100' });
    const post = await getPost({ author: user._id });
    
    return getAgent()
      .post('/api/v1/comments')
      .send({
        comment: 'test comment',
        commentBy: user._id,
        post: post._id
      })

      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          comment: 'test comment',
          commentBy: expect.any(String),
          post: expect.any(String),
          __v: 0
        });
      });
  });
  
  it('deletes comment by id', async() => {
    const comment = await getComment();
   
    return getAgent()
      .delete(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual(comment);
      });
  });
});

