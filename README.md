# Five-Clueless-Devs

## Clueless Pilots Airline Reservation System
This project is a fully contained airline reservation system, including handling users, flights and reservations.
It is implemented using the MERN stack.

### Motivation
We have created this project to practice using the different technologies included in the MERN stack, as well as apply the agile methodologies in a real life practical application. Moreover, this project presented an opportunity for us to work using the tools commonly used in the industry such as git, and go through the software development cycle from data and requirements collection, to development to testing and back to development and so on.

### Build Status
To see a sample of the project go to https://cluelesspilots.netlify.app/  
If you fork this repo to create another version of the project, you need to add a .env file in the backend folder containing the following params:
 * DB_MONGO = _Your mongoDB url for the database_
 * MAIL_FROM = _The email address that notifactions will be sent from_
 * MAIL_HOST = _Your email host address "could be outlook"_
 * MAIL_PORT = _The port used fot the email smtp protocol_
 * MAIL_USER = _User name for this mail host_
 * MAIL_PASS = _Mail host password_
 * JWT_SECRET = _The hash used for the json web token_

To run the project after adding the .env, you go to the front end directory and run the front end server:  
    `npm start`  

To run the backend server, go to the backend directory then:  
    `npm run app`  

### Code Style
 * All variables are using the camelCase convention.
 * Each component in the frontend is made in a separate .js file and exported to other components. If styling is needed, a .css file   with the same name is also created and imported to that component.
 * In the backend, all requests for a certain model are placed in a separate .js file and accessed through the exported router.
 * Proper Indentation exists at the beginning and at the end of each block in the program.
 * No digits were used in variable and function names.
 * Use of global variables was kept to a minimum.

### Tech/Framework used
This project was implemented using the MERN stack. Where the database is using the NoSQL MongoDB, backend server was handled using express.js, front end was implementes using React and all of these were running using the Node.js runtime environment.  
Payments were handled using stripe APIs (https://stripe.com/docs/api)  
Emails were sent using the nodemailer library (https://nodemailer.com/about/)  
The styling library used was the React Material UI Library (https://mui.com/)  

### Features
In this reservation system, a user can easily modify his reservation after confirming it. They can easily change the booked seat on the same flight, or delay or advance any booked flight and pay/refund the price difference. An email is sent confirming any change done.

Unlike modern airplane reservation websites, our website features a simplistic uncrowded UI that makes the reservation process less stressful than it needs to be (looking at you flyin 😉)

### Installation
This project uses the node runtime environment, make sure it is installed on your system before runnin the app, or install the LTS version from https://nodejs.org/en/download/.

For the project to run, you must install all the dependencies in the package.json, do that by running  
    `npm install`  
    in the root folder, as well as frontend and backend folders.
This will install all the dependencies needed such as mui, stripe, jsonwebtoken, express, react, mongoose, parallax, etc.

### API reference
* Mongoose: https://mongoosejs.com/docs/api.html
* Express: https://expressjs.com/en/api.html
* Stripe: https://stripe.com/docs/api
* Nodemailer: https://nodemailer.com/about/ 

### Tests
Tests can be easily performed by running both the frontend and backend servers, then using the frontend to create a user.
* **To Edit User:**   
Click on *View Profile*, *Edit Information*, then do some edits or change the password then click *Edit User*. The profile page should contain the new data.
* **To test reservation:**   
Search for a flight, test using different combination of From, To, dates and classes, then go through with reserving the flight. As the project is not yet deployed, you can use any of Stripes test cards to pay for the flights. If everything is successful, navigating to *View Reservations* through the Nav Bar, you should see that reservation. An email should have been sent to your account email containing all reservation details and payment details.
* **To test editing reservation:**  
Select a reservation, click *Update Depart Flight*, search and select the new flight, either repay using the stripe test card, or the amount will automatically be refunded to the test card, select the seats and you should get your new itenerary with the updated flights.

### How to Use?
Follow the instructions in the **Installation** then the **Build Status** sections to successfully run the project.

### Contribute
Issues with the code will be actively added to the issues on GitHub, everyone is welcome to resolve those issues then perform a pull requests, we will review the pull request, resolve any confliccts and push it to the main!!

### Credits
* Parallax Tutorial by Canddev: https://www.youtube.com/watch?v=QfLI4BoXglA&ab_channel=CandDev
* The Course Piazza Page: https://piazza.com/class/kuuxc9q9oev1bi?cid=212
* Node.js : https://www.youtube.com/playlist?list=PLZlA0Gpn_vH_uZs4vJMIhcinABSTUH2bY
* ES6: https://www.youtube.com/playlist?list=PLZlA0Gpn_vH-0FlQnruw2rd1HuiYJHHkm
* React introduction: https://www.youtube.com/playlist?list=PLZlA0Gpn_vH_NT5zPVp18nGe_W9LqBDQK
* React Hooks --functional components: https://www.youtube.com/playlist?list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h
* JWT authentication: https://www.youtube.com/watch?v=mbsmsi7l3r4 
* Stripe Tutorial: https://www.youtube.com/watch?v=lbEFSP1WAv0

### Code Examples
* For creating a backend api:  
 ```js
 router.get('/search', (req, res) => {  
    Flight.find(req.query)  
        .then(flight => res.json(flight))  
        .catch(err => res.status(404).json({ nobookfound: 'No flights found' }));  
});
```  

* Axios Request:  
    ``` js
axios.get(BACKEND_URL + "flights/search?")  
.then(res => {  
    setAll(res.data);   
}).catch(err => {   
    console.log(err);   
})   
    ```     
  
* Example of a database schema:  
```javascript
const mongoose = require('mongoose');   
const ReservationSchema = new mongoose.Schema({   
  UserID:{  
    type : String,
    required: true
  },
  from: {
    type: Number,
    required: true
  },
  to: {
    type: Number,
    required: true
  },
  .
  . // more objects in the schema
  .
  .});
  module.exports = Reservation = mongoose.model('reservation', ReservationSchema);
```  

* Example of React Router Path:
```html
<Route path='/search-user' component={SearchFlightUser} />
 <Route path='/update-flight/:id' component={UpdateFlight} />
```  
  
### Screenshots
* Search for flights  
![Search for flights](/frontend/src/Screenshots/1.png?raw=true "Search for flights")  
  
* Reserved Flights  
![Reserved Flights](/frontend/src/Screenshots/2.png?raw=true "Reserved Flights")  

* Reservation Summary    
![Reservation Summary](/frontend/src/Screenshots/3.png?raw=true "Reservation Summary")  
  
* Select Seats  
![Select Seats](/frontend/src/Screenshots/4.png?raw=true "Select Seats")  

* Payment   
![Payment](/frontend/src/Screenshots/5.png?raw=true "Payment")  

* Login        
![Login](/frontend/src/Screenshots/6.png?raw=true "Login")  
  
* Registration  
![Registration](/frontend/src/Screenshots/7.png?raw=true "Registration")


