
const UserModel = require('../models/UserSchema')
const UserRefModel = require('../models/UserRefSchema')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { json } = require('express');

exports.HomePageController = (req, res) => {
    res.status(200).json({ message: 'this is testing route of winlancer api' })
}

exports.SignInController = (req, res) => {
    const { username, password } = req.body
    UserModel.findOne({ username })
        .then(user => {
            if (!user) return res.status(401).json({ message: 'user not found' }) 
            bcrypt.compare(password,user.password)
            .then(isMatch=>{
                if(!isMatch) return res.status(203).json({message: 'Password incorrect'});
               const token = jwt.sign({user},process.env.JWT_SEC_KEY,{expiresIn:'1h'})
               req.header('auth-token',token)
                res.status(200).json({ message: 'user Loggedin Successfully',token }) 
            })
        })
        .catch(() => res.status(500).josn({ message: 'internal server error' }))

}

exports.SignUpController = (req, res) => {
    const { username, password } = req.body
    const NewUser = new UserModel({ username,password })
    UserModel.findOne({ username })
        .then(user => {
            if (user) return res.status(302).json({ message: 'user already exists' })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(NewUser.password,salt, (err, hash) => {
                    if (err) throw err
                    NewUser.password = hash;
                    NewUser.save()
                    .then(user=>res.status(201).json({ message: 'User Created Successfully', user }))
                    .catch(error=>res.status(500).json({ message: 'internal server error', error: error }))
                })
            })

        })
        .catch((error) => res.status(500).josn({ message: 'Internal server error', error: error }))
}


exports.AddUserController=(req,res)=>{
    
    
    const { first_name,last_name,email,id } = req.body;
    const newUser = new UserRefModel({ first_name,last_name,email,id });
    UserModel.findOne({username: req.user.username}).then( loggedinUser => {
       
         newUser.UserAddBy = loggedinUser;
        loggedinUser.Refusers.push(newUser);
        loggedinUser.save().then( () => {
            newUser.save()
            .then( () => res.status(200).json({message: "New User created"}));
        });
    }) 
     .catch( err => res.status(500).json({message: 'Internal server problem', error: err}));
}

exports.GetUserController=(req,res)=>{
    UserModel.findOne({username: req.user.username})
    .populate('Refusers')
    .exec( (err, user) => res.status(200).json({message: "All Users", Users: user.Refusers}));
}

exports.DeleteUserController=(req,res)=>{

 UserModel.findOne({ username: req.user.username })
 .then(user => {
   if (user) {
    UserRefModel.findOneAndDelete({ _id: req.params.id })
       .then(() => {
         let index = user.Refusers.findIndex(i => i._id === req.params.id)
         user.Refusers.splice(index - 1, 1)
         user.save()
           .then(save => {
             const token = jwt.sign({ user }, process.env.JWT_SEC_KEY, { expiresIn: '2h' });
             req.header('auth-token', token);
             res.status(200).json({ message: 'deleted sucessfully', save, token })
           })
       })

   }

 })

}

