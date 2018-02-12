const mongoose = require('mongoose');

const { Schema } = mongoose;

const activitySchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  date: { 
    type: Date, 
    default: Date.now,
    required: true
  },
  time: {
    type: Number,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true }
})

mongoose.model('activities', activitySchema);