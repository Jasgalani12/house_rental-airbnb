const express=require('express');
const session=require('express-session')
const mondodbstore=require('connect-mongodb-session')(session)
const dbpath="mongodb+srv://root:1234@jas.rssa3h4.mongodb.net/airbnb?retryWrites=true&w=majority&appName=jas";
const path=require('path')
const storerouter=require('./routes/storerouter.js')
const hostrouter=require('./routes/hostrouter.js')
const authrouter = require('./routes/authrouter.js');
const root=require('./utils/pathUtil.js')
const {pagenotfound}=require('./controller/errorcontroller.js');
const { default: mongoose } = require('mongoose');
const { MongoDBStore } = require('connect-mongodb-session');


const app=express();
app.set('view engine','ejs')
app.set('views','views')
// app.use((req,res,next)=>{
//     console.log(req.url,req.method);
//     next()
// });

const store = new mondodbstore({
    uri:dbpath,
    collection:'sessions'
})

app.use(express.urlencoded())

app.use(session({
    secret:'session for airbnb',
    resave:false,
    saveUninitialized:true,
    store:store
}))

// app.use((req,res,next)=>{
//     req.session.isLoggedIn =req.session.isLoggedIn
//     next()  
// })

app.use(storerouter);
app.use(authrouter);
app.use("/host",hostrouter);
app.use('/host',(req,res,next)=>{
    if(!req.session.isLoggedIn){
        res.redirect('/login')
    }
    else{
        next()
    }
})
app.use(express.static(path.join(root,'./','public')))

app.use(pagenotfound)

const port=3000;


mongoose.connect(dbpath)
    .then(()=>{
        console.log('connected to mongo')
        app.listen(port,()=>{
            console.log(`server running on address http://localhost:${port}`)
        });
    })
    .catch(err=>{
        console.log('error while connecting to mongo',err)
    })