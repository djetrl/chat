import bodyParser from 'body-parser';
import express from 'express';
import socket from 'socket.io';
import path from 'path';
import cors from 'cors'
import { UserCtrl, DialogCtrl, MessageCtrl, UploadCtrl } from '../controllers';
import { updateLastSeen, checkAuth, uploadFile } from '../middleware';
import { loginValidation,registerValidation } from '../utils/validations';

const createRoutes =(app:express.Express, io: socket.Server)=>{
  const UserController = new UserCtrl(io) ;
  const DialogController = new DialogCtrl(io) ;
  const MessageController = new MessageCtrl(io);
  const UploadFileController = new UploadCtrl();
  const corsOptions = {
    origin:['http://217.71.129.139:4113', 'http://localhost:3003'], 
    credentials:true,   
    optionSuccessStatus:200,
    allowedHeaders:["content-type","access-control-allow-headers", "Token","Origin", "X-Requested-With", "Accept", "Authorization", "Content-Encoding", "folder" ],
    preflightContinue: false,
    optionsSuccessStatus:204,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS",


}

  app.use(cors(corsOptions))

  app.use(bodyParser.json());
  app.use(checkAuth);
  app.use(updateLastSeen);
  app.use('/public/',express.static(path.join(__dirname, '../../public')));


  app.route('/user/me')
     .get(UserController.getMe)
     .delete(UserController.delete);

  app.get('/user/verify',  UserController.verify);
  app.post('/refresh-tokens', UserController.refreshToken);

  app.post('/user/signup',registerValidation, UserController.create);
  app.post('/user/signin', loginValidation, UserController.login);

  app.get('/user/find',  UserController.findUsers);
  app.patch('/user/recover',  UserController.recoverPassword);
  app.post('/user/passwordVerification', loginValidation, UserController.passwordVerification);
  app.get('/user/:id', UserController.show);
  app.patch('/user/me', UserController.update)
  app.patch('/user/passwordChange', UserController.updatePassword)
  
  app.get('/dialogs', DialogController.index);
  app.patch('/dialogs', DialogController.update)
  app.delete('/dialogs/:id', DialogController.delete); 
  app.post('/dialogs', DialogController.create);
  app.post('/dialogs/group', DialogController.createGroup);
  app.post('/dialogs/addUserGroup', DialogController.addPartnerFromDialog);
  app.post('/dialogs/deletePartnerForGroup', DialogController.deletePartner);
  app.get('/messages', MessageController.index);
  app.get('/messages/find', MessageController.findMessage);
  app.delete('/messages',  MessageController.delete);
  app.post('/messages', MessageController.create); 

  app.get('/files/media', UploadFileController.indexByDialogId);
  app.delete('/files/media', UploadFileController.delete);
  app.post('/files/media',uploadFile.single('file') , UploadFileController.create);   
}
export default createRoutes;