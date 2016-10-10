import { User} from '../models/';

async function signup(credentials){
  const userModel = new User(credentials);
  const newUser = await userModel.save();
  if (!newUser) {
    throw new Error('Error adding new user');
  }
  return {userId: newUser._id};
}

async function login(credentials){
  const { username, password } = credentials;
  const users = await User.find({username: username}).lean().exec();
  const user = users[0];
  if(!user || user.password !== password){
    throw new Error('Check Credentials');
  }
  return {userId: user._id}
}

async function getUsers(context){
  const user = await User.find({}).exec();
  return user;
}

async function getUser(userId, context){
  const user = await User.find({_id: userId}).exec();
  return user[0]
}

async function removeUser(userId, context){
  const removedUser = await User
      .findByIdAndRemove(userId, {})
      .exec();
  if (!removedUser) {
    throw new Error('Error removing user');
  }
  return removedUser;
}

async function getCurrentUser(context){
  const {userId} = context;
  const user = await User.find({_id: userId}).exec();
  return user[0]
}

export default {
  signup,
  login,
  getUser,
  getUsers,
  removeUser,
  getCurrentUser,
};
