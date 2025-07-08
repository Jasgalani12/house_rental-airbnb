const { check,validationResult } = require("express-validator");

exports.getlogin=(req,res,next)=>{
    res.render('auth/login',{
        pagetitle:'login',
        isLoggedIn:false,
    })
};
exports.getsignup=(req,res,next)=>{
    
    res.render('auth/signup',{
        pagetitle:'Signup',
        isLoggedIn:false,
        errors:[],
        oldInput: {firstname:"",lastname:"",email:"",usertype:""}
        
    })
};

exports.postlogin=(req,res,next)=>{
    req.session.isLoggedIn=true;
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
        const{ firstname,lastname,email,password,usertype}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).render('auth/signup', {
                pagetitle: 'Signup',
                isLoggedIn: false,
                errors: errors.array().map(err => err.msg),
                oldInput: {firstname,lastname,email,password,usertype}
            });
        }
        res.redirect('/login')
    }
];

exports.postlogout=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
};