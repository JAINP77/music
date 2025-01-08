import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import projectController from './src/controller/controller.js';
import validationRequest from './src/middlewares/validation-middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middlware.js';
import userController from './src/controller/user.controller.js';
import { auth } from './src/middlewares/auth.middleware.js';
import { setLastVisited } from './src/middlewares/lastvisited.middleware.js';


// create an object to use controller functions
const projController = new projectController();
const userControll = new userController();
//create server using express
const server = express();
server.use(
    session({
        secret:"secretKey",
        resave:false,
        saveUninitialized:true,
        cookie:{secure:false}
    })
);

// received data is in encoded format and that is handeld here
server.use(express.urlencoded({ extended: true }));

// for handling cookies
server.use(cookieParser());


// telling our system that we are using EJS template engine and it's layout
server.set('view engine','ejs');
server.set('views', path.join(path.resolve(),'src','view'));
server.use(ejsLayouts);

// for telling that we are using public folder for images
server.use(express.static('public'));

// create routes for calls
server.get('/',setLastVisited,auth, projController.getProduct);
server.get('/new',auth, projController.getAddForm);
server.get('/update-product/:id',auth, projController.getUpdateProduct);
server.get('/delete-product/:id',auth, projController.deleteProduct);
server.get('/register-page',userControll.getRegisterForm);
server.get('/login-page',userControll.getLoginForm);
server.get('/logout',userControll.logoutUser)

server.post('/',uploadFile.single('imageUrl'),validationRequest,projController.postNewProduct);
server.post('/update-product',projController.postUpdateProduct);
server.post('/login',userControll.postLogin);
server.post('/register',userControll.postRegister);




// listen the server
server.listen(3000,()=>{
    console.log('server is listening at port 3000');
})