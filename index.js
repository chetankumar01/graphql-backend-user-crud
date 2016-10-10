import express from 'express'
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import jwt from 'jwt-simple'

import schema from './graphql'
import { UserService } from './services'

const jwt_secret = '1234567890qwertyuiop';
let app = express();
app.use(bodyParser());

app.post('/api/createuser', (req, res) => {
  UserService.signup(req.body.credentials)
             .then((response) => {
               res.json({
                 success: true
               });
             }).catch((error) => {
               res.status(400).send(error);
             });
});

app.post('/api/deleteuser', (req, res) => {
  UserService.removeUser(req.body.userId)
             .then((response) => {
               res.json({
                 success: true
               });
             }).catch((error) => {
               res.status(400).send(error);
             });
});

app.post('/api/auth/createuser', (req, res) => {
  UserService.signup(req.body.credentials)
             .then((response) => {
               const { userId } = response;
               const token = jwt.encode( { userId }, jwt_secret );
               res.cookie('token', token, { httpOnly: true } );
               res.json({
                 success: true,
                 userId,
               });
             }).catch((error) => {
               res.status(400).send(error);
             });
});

app.post('/api/auth/login', (req, res) => {
  UserService.login(req.body.credentials)
             .then((response) => {
               const { userId } = response;
               const token = jwt.encode( { userId }, jwt_secret );
               res.cookie('token', token, { httpOnly: true } );
               res.json({
                 success: true,
                 userId,
               });
             }).catch((error) => {
               res.status(400).send(error);
             });
});

function getUserDetails(req){
  if(req.headers.cookie){
    let token = req.headers.cookie.split('token=')[1]
    if(token.length > 10){
      const decoded = jwt.decode( token, jwt_secret );
      return decoded
    }
  }
  return {userId: null}
}

// GraphqQL server route
app.use('/graphql', graphqlHTTP(req => {
  let userDetails = getUserDetails(req);
  return ({
    schema,
    pretty: true,
    graphiql: true,
    context: userDetails
  })}
));

// Connect mongo database
mongoose.connect('mongodb://localhost/graphql');

// start server
var server = app.listen(8080, () => {
  console.log('Listening at port', server.address().port);
});
