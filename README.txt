- All user types (Driver, Examiner and Admin) are able to signup.
- Only Driver user is able to login and access the driver dashboard.
  - If Examiner or Admin tries to login an error message is shown.

Validation Checks (other than Mongoose User Model):
  - Signup
    - Same password check 
    - Unique username required
    - All fields are required 
  - Login
    - If user does not exist user is asked to signup
    - All fields are required
  - New Driver Form
    - All fields are required
  - Existing Driver form
    - All fields are required
    - Driver allowed to change certain fields
