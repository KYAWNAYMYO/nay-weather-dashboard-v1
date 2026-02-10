const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geolocation = require('./utils/geolocation');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const airquality = require('./utils/airquality');

const app = express();
const port = process.env.PORT

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

const googleapisaccesskey = process.env.GOOGLE_APIS_ACCESS_KEY;
const size = '500x400';
const zoom = 10;

const contactLinks = [
    {
        label: 'Email',
        icon: 'Mail',
        href: 'mailto:naymyokyaw21@gmail.com',
    },
    {
        label: 'Website',
        icon: 'Web',
        href: 'https://naymyokyaw.azurewebsites.net/',
    },
    {
        label: 'LinkedIn',
        icon: 'Linkedin',
        href: 'https://www.linkedin.com/in/nay-kyaw-6b734437/',
    },
    {
        label: 'GitHub',
        icon: 'Github',
        href: 'https://github.com/KYAWNAYMYO',
    },
];

app.get('', (req, res) => {
    geolocation((error, {latitude, longitude,} = {}) => {
        if(error) {
            return res.send({error: error});
        }
        
        forecast(latitude, longitude, (error, forcastData) => {
            if(error) {
                return res.send({ error })
            }

            const staticURL = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=10&size=500x400&key=${googleapisaccesskey}`;

            res.render('index', {
                title: 'Weather Dashboard',
                name: 'Nay Myo Kyaw',
                staticMapUrl: staticURL,
                localWeather: forcastData
            });
        })
    })


})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Nay Myo Kyaw, and I specialize in leading service projects, consulting on observability, and building digital products and ' +
            'online courses. I focus on creating bilingual (English–Burmese) educational resources, templates, and branding materials that combine clarity, ' +
            'nuance, and visual impact. With expertise in structuring technical and creative projects, I help professionals transform complex ideas into actionable, ' +
            'engaging content.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Nay Myo Kyaw'
    })
})

app.get('/contact', (req, res) => {
        res.render('contact', {
            title: 'Contact',
            contactLinks: contactLinks,
            name: 'Nay Myo Kyaw'
        });
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({error: error});
        }

       forecast(latitude, longitude, (error, forcastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forcastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/airquality', (req, res) => {
    res.render('airquality', {
        title: 'Air Quality',
        name: 'Nay Myo Kyaw'
    });
})

app.get('/getairquality', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error: error});
        }

        airquality(latitude, longitude, (error, airqualityData) => {
            if(error) {
                return res.send({error: error});
            }
            res.send({
                airqualityData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/{*splat}', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Nay Myo Kyaw',
        errorMessage: 'Help article not found.'
    })
})

app.get('/{*splat}', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


