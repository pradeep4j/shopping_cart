import mongoose from 'mongoose';
import Logger from '../utils/logger.js';
const connection = (username,password,PORT) => {
  try {
    //https://www.mongodb.com/cloud/atlas     //connection with mongo db using mongoose on port 5000
    //console.log(username+'-'+password+'-'+PORT);
   /*  const DB_URL = `mongodb+srv://${username}:${password}@cluster0.xx7bo1e.mongodb.net/react-redux-context-formik?retryWrites=true&w=majority`;

   mongoose.connect(DB_URL,{useNewUrlParser: true, useUnifiedTopology:true})
                               .then(response => {
                                  console.log(`${response.connection.host}`);
                                  console.log('Database Connected Succesfully');
                                });*/
    //useNewUrlParser : The underlying MongoDB driver has deprecated their current connection string parser. Because this is a major change, they added the useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser. useUnifiedTopology: the MongoDB driver will try to find a server to send any given operation to, and keep retrying for serverSelectionTimeoutMS milliseconds. If not set, the MongoDB driver defaults to using 30000 (30 seconds)
    /* mongoDb connection on local with mongoose javascript library for node js which is a ORM for mongodb and used for ODM(Object data modeling)*/
    const DB_URL = `mongodb://127.0.0.1:27017/react-redux-context-formik`;
    mongoose.connect(DB_URL,{useNewUrlParser: true, useUnifiedTopology:true}).then(response => {
      console.log(`${response.connection.host}`);
      console.log('Database Connected Succesfully');
    });
  } catch (error) {
    Logger.error(error.message);
    console.log('Error: ', error.message);
  }
}

export default connection;