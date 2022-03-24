const express = require( "express" )
const path = require( "path" )
const ejs = require( "ejs" )
// for environment variables
require( "dotenv" ).config()
//for database
const mongoose = require( "mongoose" )
const Driver = require( "./models/Driver" )
//for form multimedia data
const fileUpload = require( "express-fileupload" )
// for user session
const expressSession = require( "express-session" )
const flash = require( "connect-flash" )

const ONE_DAY = 1000 * 60 * 60 * 24
const {
  PORT = 4000,
  NODE_ENV = 'development',
  DB_USERNAME,
  DB_PASSWORD,

  SESS_NAME = 'sid',
  SESSION_SECRET,
  SESS_LIFETIME = ONE_DAY,
} = process.env

const IN_PROD = NODE_ENV === 'production'

//middleware for validation
const validateNewDriver = require( "./middleware/validateNewDriver" )
const validateExistingDriver = require( "./middleware/validateExistingDriver" )
const validateUserSignup = require( "./middleware/validateSignup" )
const validateUserLogin = require( "./middleware/validateLogin" )
const driverAuthentication = require( "./middleware/driverAuthentication" )
const redirectIfAuthenticated = require( "./middleware/redirectIfAuthenticated" )

//importing controllers
const driverUpdate = require( "./controllers/driverUpdate" )
const driverFetch = require( "./controllers/driverFetch" )
const driverNew = require( "./controllers/driverNew" )
const pageHome = require( "./controllers/home" )
const pageDriverDashboard = require( "./controllers/pageDashboard" )
const pageG = require( "./controllers/pageG" )
const pageG2 = require( "./controllers/pageG2" )
const pageSignup = require( "./controllers/pageSignup" )
const pageLogin = require( "./controllers/pageLogin" )
const userSignup = require( "./controllers/userSignup" )
const userLogin = require( "./controllers/userLogin" )
const userLogout = require( "./controllers/userLogout" )

const app = express()
app.set( "view engine", "ejs" )
app.use( express.static( "public" ) )
//for form data from POST request
app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )
app.use( fileUpload() )
app.use(
  expressSession( {
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: IN_PROD,
    },
  } ),
)
app.use( flash() )

app.use( "/driver/new-driver", validateNewDriver )
// app.use( "/driver/update-driver", validateExistingDriver )
app.use( "/user/signup", validateUserSignup )
app.use( "/user/login", validateUserLogin )

global.loggedIn = null
app.use( "*", ( req, res, next ) => {
  loggedIn = req.session.userType
  next()
} )


//mongodb database
mongoose.connect( "mongodb+srv://" + DB_USERNAME + ":" + DB_PASSWORD + "@sandbox.tuank.mongodb.net/abc_driving_center",
  {
    useNewUrlParser: true,
  }
)

// routing
// driver authentication prevents any user other than 'Driver' from access
app.post( "/driver/update-driver", driverAuthentication, driverUpdate )

// app.post( "/driver/driver-details", driverAuthentication, driverFetch )

app.post( "/driver/new-driver", driverAuthentication, driverNew )

app.get( "/", pageHome )

app.get( "/index", pageHome )

app.get( "/driver/dashboard", driverAuthentication, pageDriverDashboard )

app.get( "/driver/g2_page", driverAuthentication, pageG2 )

app.get( "/driver/g_page", driverAuthentication, pageG )

app.get( "/signup", redirectIfAuthenticated, pageSignup )

app.get( "/login", redirectIfAuthenticated, pageLogin )

app.post( "/user/signup", redirectIfAuthenticated, userSignup )

app.post( "/user/login", redirectIfAuthenticated, userLogin )

app.get( "/logout", userLogout )

// this middleware like route directs user to not found page after express goes through all the routes
app.use( ( req, res ) => res.render( 'notfound' ) )

app.listen( PORT, () => {
  console.log( "Listening on port: 4000" )
} )
