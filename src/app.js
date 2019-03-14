const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocoding = require('./utils/geocoding');

const app = express();
const port = process.env.PORT || 3000;
//Setup handlebars engine and views location
app.set('views', path.join(__dirname, '../templates/views'));
app.set('view engine', '.hbs');
hbs.registerPartials(path.join(__dirname,'../templates/partials'));
hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});
//Setup static directory to serve
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bushra Aldosary'
    });
});

app.get('/about', (req, res) => {
   res.render('about', {
       title: 'About Me!',
       name: 'Bushra Aldosary'
   })
});

app.get('/progress/*', (req,res) => {
    res.render('error', {
        title: 'Progress page not found.'
    })
});

app.get('/weather', (req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error: "You must provide the address"
        });
        
    }
    geocoding(req.query.address, (err, data) => {
        if(err)
        {
            return res.send(err);
        }  
        forecast(data.longitude, data.latitude, (err, foreData) => {
           if(err)
           {
               return res.send(err);
           };  
            res.send({
                location: data.location,
                forecast: `${foreData.summary}. It is currently ${foreData.temperature}. There is a ${foreData.chanceOfRain}% chance of rain.`
            });
    }); 

});
});
 
/*app.get('/weather', (req,res) => {
    if(!req.query.address)
    {
        return res.render('error',{
            error: "You must provide the address"
        });
    }
    geocoding(req.query.address, (err, data) => {
        if(err)
        {
            return res.render('error', {
             error: "You must provide the address" });
        }  
        forecast(data.longitude, data.latitude, (err, foreData) => {
           if(err)
           {
               return res.render('error', {
                error: "You must provide the address" });
           }
            res.render('weather', {
               title: 'Weather',
               details: {
               forecast: foreData,
               location: data.location
            }}); 
        });  
    }); 
});*/

app.get('*', (req,res) => {
    res.render('error',{
        title: 'Page not found'
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});