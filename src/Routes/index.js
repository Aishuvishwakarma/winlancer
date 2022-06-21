const express = require('express')

const router = express.Router();

const  { isLoggedIn } = require('./verifyToken');

const {
HomePageController,
SignInController,
SignUpController,
AddUserController,
GetUserController,
DeleteUserController
}=require('../Controllers/UserController')

router.get('/',HomePageController)
router.post('/signin',SignInController)
router.post('/signup',SignUpController)

router.post('/adduser',isLoggedIn,AddUserController)
router.get('/getuser',isLoggedIn,GetUserController)
router.delete('/deleteuser/:id',isLoggedIn,DeleteUserController)

module.exports = router