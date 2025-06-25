const express=require('express');
const path=require('path')
const storerouter=require('./routes/storerouter.js')
const hostrouter=require('./routes/hostrouter.js')
const root=require('./utils/pathUtil.js')
const {pagenotfound}=require('./controller/errorcontroller.js')

const app=express();
app.set('view engine','ejs')
app.set('views','views')
// app.use((req,res,next)=>{
//     console.log(req.url,req.method);
//     next()
// });

app.use(express.urlencoded())

app.use(storerouter);
app.use("/host",hostrouter);
app.use(express.static(path.join(root,'./','public')))

app.use(pagenotfound)

const port=3000;
app.listen(port,()=>{
    console.log(`server running on address http://localhost:${port}`)
});