const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  photoURL: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    required: true
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

module.exports = mongoose.model('Post', schema);
