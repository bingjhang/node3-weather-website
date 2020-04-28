const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')

const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    res.render('index',{
        title:"Weather",
        name:"Andrew Mead"
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
    helpText:"This is some helpful text.",
    title:"Help",
    name:"Andrew Mead"
    })
}
)
app.get('/about',(req,res) => {
    res.render('about',{
        title:"About me",
        name:"Andrew Mead"
    })
})
app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error:'You must provide a address term'
        })
    }
    geocode(req.query.address, (error,{latitude, longitude, location})=>{
        if(error) {
        return console.log(error);
        }
     forecast(latitude, longitude,(error, forecastData) => {
        if(error) {
           return res.send({error});
        }
        res.send({
            forecast: forecastData,
            location,
            address:req.query.address
        })
              })
        })
})
app.get('/products', (req,res) => {
    if (!req.query.search) {
    return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})
app.get('/help/*', (req, res) => {
    res.render('404',{
        title:"404",
        name:"Andrew Mead",
        errorMessage:"Help article not found."
    })
})
//404
app.get('*', (req, res) => {
    res.render('404',{
        title:"404",
        name:"Andrew Mead",
        errorMessage:"Page not found."
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
