# Hospital-API
We’re going to design an API using Node.js and MongoDB for the doctors of a Hospital which has been allocated by the govt for testing and quarantine + well being of COVID-19 patients

## How to set it up on your local Computer?
1) Clone the Package to your local System
2) Navigate to the folder wherein the project has been cloned
3) Open Terminal and type `npm install` [Make sure node is already installed in your system!]
4) Type `node app.js`
5) The app should run on default port 8000 or if you've mentioned env port it'll run on that.
6) Not working? Ping me!.

## How to test if everything runs as expected?
1) Install Mocha globally using `npm install --global mocha`
2) If some read write error occur in Mac/Linux try `sudo npm install --global mocha`
3) Open Terminal and type `npm test`
4) Test will run and tell which API's failed which worked.

## What are the Different API's in this project?
1)`/doctors/register` → Registers a new Doctor to the hospital Database takes in madatory `username` and `password`  
2) `/doctors/login` → Doctor Login with username and password, if Authenticated, Returns the JSON Web token, takes in madatory `username` and `password`  
3) `/patients/register` → API to register a new Patient, This is a protected route only authorized doctor can create a new Patient. Takes in madatory patients id, whichis the phone number as `phone`  
4) `/patients/:id/create_report` → API to create a report for the Patient with ID `id` . Takes in a mandatory field `Status` in it  
5) `/patients/:id/all_reports` → To Show all the reports of a particular Patient with id `id`. unprotected Route.  
6) `/reports/:status`  → To Show all the reports in the database with a particular `status` lets say Positive or Negative Or Quarantined etc.  


## What's in the folders?  
1) Entry point : app.js. 
2) `config` : Contains configuration files of Mongoose and Passport Authentication Strategies. 
3) `Controllers\api` : The controllers for various API's like Doctor API or Patient API or Report API.
4) `Models` : Mongoose Models for the Doctors, Patients and reports!
5) `routes` : index.js which manages routes efficiently to have a scalable project.
6) `views` : Empty For now :)
7) `test` : Contains various testing protocols for efficient debugging of patient/doctor/report API's
