import mongoose from 'mongoose';
mongoose.connect('mongodb://chat-db:27017/chat', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
},
 (err:any)=>{
  if (err) {
    throw Error(err);
  }
});