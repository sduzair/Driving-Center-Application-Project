# Driving-Licence-Application

Validation Checks:
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
  - Every form retains the entered fields upon validation errors  

Assumptions:
  - Admin user creates appointment slots
  - Driver user can book a slot for G or G2 test
  - Once a slot is booked by a driver user for G or G2 test the slot is reserved
