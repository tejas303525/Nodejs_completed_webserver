const express=require("express")
const app=express()
const path = require("path");
const PORT = process.env.PORT || 3500;
const {logger}=require("./middleware/logevents")
const cors=require("cors")

app.use(logger)
//cross orgin resourcw sharing

const whitelist = ['commnet.netlify.app', '127.0.0.1:3500', 'google.com'];

const corsOption={
    origin: (origin,callback)=>{
        if(whitelist.indexOf(origin)!=-1){
            callback(null,true)
        }else{
            callback(new Error("Not allowed by CORS"))
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOption))

app.use(express.urlencoded({extended:false}))

app.use(express.json())
app.use(express.static(path.join(__dirname,'/public')))




app.get('^/$|/index(.html)?', (req,res)=>{
    // res.sendFile('./views/index.html' ,{root: __dirname})
    res.sendFile(path.join(__dirname,"views","index.html"))
    
})
app.get('/new-page(.html)?', (req,res)=>{
    // res.sendFile('./views/index.html' ,{root: __dirname})
    res.sendFile(path.join(__dirname,"views","new-page.html"))
    
})
app.get('/redirect(.html)?|/old-page(.html)?', (req,res)=>{
    // res.sendFile('./views/index.html' ,{root: __dirname})
   res.redirect(301,"/new-page.html")
})

app.get('/hello(.html)?',(req,res,next)=>{
    console.log("attempted to load hello.html")
    next()
},(req,res)=>{
    res.sendFile(path.join(__dirname,"views","index.html"))
})

app.get('/*', (req,res)=>{
    res.status(404).sendFile(path.join(__dirname,"views","404.html"))
})

app.listen(PORT, () => console.log(`server on port: ${PORT}`));

