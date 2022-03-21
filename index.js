const express = require("express")
const path = require("path")
const ejs = require("ejs")
//for database
const mongoose = require("mongoose")
const Driver = require("./models/Driver")
//for form multimedia data
const fileUpload = require("express-fileupload")
// for user session
const expressSession = require("express-session")
// for environment variables
require("dotenv").config()

//middleware for validation
const validateNewUserMiddleware = require("./middleware/validateNewUser")
const validateExistingUserMiddleware = require("./middleware/validateExistingUser")
const validateUserSignupMiddleware = require("./middleware/validateSignup")
const validateUserLoginMiddleware = require("./middleware/validateLogin")
const authenticationMiddleware = require("./middleware/authentication")
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticated")

//importing controllers
const updateDriverController = require("./controllers/driverUpdate")
const fetchDriverController = require("./controllers/driverFetch")
const newDriverController = require("./controllers/driverNew")
const homeController = require("./controllers/home")
const dashboardController = require("./controllers/pageDashboard")
const gPageController = require("./controllers/pageG")
const g2PageController = require("./controllers/pageG2")
const signupPageController = require("./controllers/pageSignup")
const loginPageController = require("./controllers/pageLogin")
const userSignupController = require("./controllers/userSignup")
const userLoginController = require("./controllers/userLogin")

const app = express()
app.set("view engine", "ejs")
app.use(express.static("public"))
//for form data from POST request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())
app.use("/driver/new-driver", validateNewUserMiddleware)
app.use("/driver/update-driver", validateExistingUserMiddleware)
app.use("/user/signup", validateUserSignupMiddleware)
app.use("/user/login", validateUserLoginMiddleware)
const oneDay = 1000 * 60 * 60 * 24
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: false,
  }),
)

//mongodb database
// todo: create environment variables for DB credentials
mongoose.connect(
  "mongodb+srv://" +
    process.env.DB_USERNAME +
    ":" +
    process.env.DB_PASSWORD +
    "@sandbox.tuank.mongodb.net/abc_driving_center",
  {
    useNewUrlParser: true,
  },
)

//routing
// authenticationMiddlewareprevents users not signed up from access
app.post("/driver/update-driver", authenticationMiddleware, updateDriverController)

app.post("/driver/driver-details", authenticationMiddleware, fetchDriverController)

app.post("/driver/new-driver", authenticationMiddleware, newDriverController)

app.get("/", homeController)

app.get("/index", homeController)

app.get("/driver/dashboard", authenticationMiddleware, dashboardController)

app.get("/driver/g2_page", authenticationMiddleware, g2PageController)

app.get("/driver/g_page", authenticationMiddleware, gPageController)

app.get("/signup", redirectIfAuthenticatedMiddleware, signupPageController)

app.get("/login", redirectIfAuthenticatedMiddleware, loginPageController)

app.post("/user/signup", redirectIfAuthenticatedMiddleware, userSignupController)

app.post("/user/login", redirectIfAuthenticatedMiddleware, userLoginController)

app.listen(4000, () => {
  console.log("Listening on port: 4000")
})
