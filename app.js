
const hbs = require('hbs')
const path = require('path')
const express = require("express")
// const port = 8000
//for host on custom domain
const port = process.env.PORT || 8000

const publicPath = path.join(__dirname,"public")
const viewPath = path.join(__dirname,"template/views")
const partialsPath = path.join(__dirname,"template/partials")

const app = express();
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))


app.get("",(req,res)=>[
   res.render("index")

])
app.get("/about",(req,res)=>{
    res.render("about")
})
app.get("/weather",(req,res)=>{
    res.render("weather")
})
app.get("*",(req,res)=>{
    res.render(`404err`)
})
app.listen(port,()=>{
    console.log(`Server Stared on post ${port}`)
})
