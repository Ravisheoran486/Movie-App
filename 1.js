const a= require('colors')
console.log(a.red('hello'))
//requring request
const request=require('request')
// to install expreess command (npm i express)
const express=require('express')

//syntax
const app= express() 

const dotenv=require('dotenv')
dotenv.config()
/*  
incluudeing ejs file in our code


*/
    //now express will get data from view folder and are called middleware
app.set("view engine","ejs")
app.use('/public', express.static('public'))

app.get("/",(req,res)=>{
    res.render("homepage.ejs")
})
app.get("/AB",(req,res)=>{
    
    res.render("aboutme.ejs")
})

app.get("/result/:id",(req,res)=>{
    const url=`http://www.omdbapi.com/?i=${req.params.id}&apikey=${process.env.API_KEY}`
    request(url,function(error,response,body){
        if(!error && response.statusCode==200){
            const data=JSON.parse(body)    //converting json object to java script object
            console.log(data.Title)
          res.send(data)
         //var movie= data
   // console.log(movie.Title)
           res.render("AboutMovie",{movieData :data})  //movieData will be there in result.ejs
        }else{
            res.send("uhhh error")
        }
    })
})


// request
app.get("/result",(req,res)=>{
    const url=`http://www.omdbapi.com/?s=${req.query.movieName}&apikey=${process.env.API_KEY}`
    request(url,function(error,response,body){
        if(!error && response.statusCode==200){
            const data=JSON.parse(body)    //converting json object to java script object
            console.log(data)
          //res.send(data)
         
           res.render("result",{movieData:data})  //movieData will be there in result.ejs
        }else{
            res.send("uhhh error")
        }
    })
})

app.get("*",(req,res)=>{
    res.send("Go  back...")
})

//creating server by listening
app.listen(3000, ()=>{
    console.log('server started')
    console.log(a.green('hi there'))
})