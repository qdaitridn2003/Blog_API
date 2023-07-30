import mongoose from 'mongoose';
import { MongodbConfig } from '../config';

const username = MongodbConfig.username;
const password = MongodbConfig.password;
const endpoint = MongodbConfig.endpoint;

export const startMongodbConnection = () => {
  mongoose
    .connect(`mongodb+srv://${username}:${password}${endpoint}`)
    .then(() => console.log('Mongodb connection established'))
    .catch((error) => console.log(error));
};
