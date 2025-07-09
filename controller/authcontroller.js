const { check,validationResult } = require("express-validator");
const bcrypt=require('bcryptjs')
const User=require('../models/user')

exports.getlogin=(req,res,next)=>{
    res.render('auth/login',{
        pagetitle:'login',
        isLoggedIn:false,
        errors:[],
        oldInput:{email:''},
        user:{}
    })
};
exports.getsignup=(req,res,next)=>{
    
    res.render('auth/signup',{
        pagetitle:'Signup',
        isLoggedIn:false,
        errors:[],
        oldInput: {firstname:"",lastname:"",email:"",usertype:""},
        user:{}
    })
};

exports.postlogin= async (req,res,next)=>{
    const {email,password}=req.body
    const user= await User.findOne({email})
    if(!user){
        return res.status(422).render('auth/login',{
            pagetitle:'login',
            isLoggedIn:false,
            errors:['user does not exists'],
            oldInput:{email},
            user:{}
        })
    }

    const ismatch= await bcrypt.compare(password,user.password)
    if(!ismatch){
         return res.status(422).render('auth/login',{
            pagetitle:'login',
            isLoggedIn:false,
            errors:['Invalid password'],
            oldInput:{email},
            user:{}
        })
    }
    req.session.isLoggedIn=true;
    req.session.user=user
    res.redirect('/')
};
exports.postsignup=[
    check('firstname')
    .trim()
    .isLength({min:2})
    .withMessage('firstname must have 2 characters')
    .matches(/^[a-zA-Z]+$/)
    .withMessage('firstname should only have charecters'),

    check('lastname')
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage('lastname should only have charecter'),

    check('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),

    check('password')
    .isLength({min:8})
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/)
    .withMessage('Password must contain at least 1 lowercase letter, 1 uppercase letter, and 1 special character')
    .trim(),

    check('confirmpassword')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
    check('usertype')
    .notEmpty()
    .withMessage('User type is required')
    .isIn(['guest', 'host'])
    .withMessage('User type must be either guest or host'),

    check('tac')
    .notEmpty()
    .withMessage('You must agree to the terms and conditions')
    .custom((value) => {
        if (value !== 'on') {
            throw new Error('You must agree to the terms and conditions');
        }
        return true;
    }),

    (req,res,next)=>{
        const{firstname,lastname,email,password,usertype}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).render('auth/signup', {
                pagetitle: 'Signup',
                isLoggedIn: false,
                errors: errors.array().map(err => err.msg),
                oldInput: {firstname,lastname,email,password,usertype},
                user:{}
            });
        }

        bcrypt.hash(password,12)
            .then(hashpassword=>{
                const user=new User({firstname,lastname,email,password:hashpassword,usertype})
                return user.save()
                    .then(()=>{
                        res.redirect('/login')
                    })
                    .catch((err)=>{
                        return res.status(422).render('auth/signup', {
                            pagetitle: 'Signup',
                            isLoggedIn: false,
                            errors:[err.msg],
                            oldInput: {firstname,lastname,email,password,usertype},
                            user:{}
                        });
                    })
            })       
    }
];

exports.postlogout=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
};