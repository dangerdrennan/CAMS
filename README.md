This is a full stack application developed by Phillip Drennan and Jessica Huezo for the UAA College of Engineering.

# Background:

The UAA department of Computer Science and Computer System Engineering requires assessments of their capstone course to determine if certain courses require more attention.These assessments are based on the accreditation standards of ABET which measure if a student has optimal communication skills, good ethical standpoints, and knowledge of the theoretical foundations of computer science. The assessments then are aggregated to provide insight into learning trends. The department can export and analyze this data to help identify the soft spots in their curriculums.

# Purpose:

We developed this app to digitize the current manual process and to reduce the overhead of the individual who is entering data manually. This system was also built to allow for easy mobile usage of the application for easy access and on the go data fetching.
This application’s purpose is to:

Serve as a grading application for Computer Science senior projects at the University of Alaska Anchorage
Allow administrators to manage grading professors
Aggregate semester data and export the results for departmental analysis
Update the exact learning goals to keep up with any changes made by our accreditation agency, ABET

# Technologies used:

This application is run using Angular, Node, Express, PostgreSQL, and NPM. We’ve run this using these versions.

Angular CLI: 12.2.11
Node: 14.17.0
NPM: 7.20.0
Postgres: 13.3
Rxjs 6.6.7
Typescript: 4.3.5


Versions near these should work okay, but we’re giving the specific versions in the event it helps you debug.

# Application Setup Notes:

## Third Party Notes:

This app uses Auth0 for authentication. It assumes that there is someone responsible for managing the Auth0 account.

[This youtube video](https://youtu.be/laLIsXg2OxM) provides a thorough explanation of how to incorporate Auth0 into an Angular application. We used it to help set up our system, and it might be useful if you’re thinking about forking this application and setting up your own assessment management system.

[Figma](https://www.figma.com/) was very helpful in designing our frontend, and if you’d like to fork our repo and make your own additions, we’d highly recommend it as a good place to start.

Anytime you see a process.env variable, that is a config var set by our third party hosting service. These values are only called on ng build, and are unnecessary for running the application in development mode.

## A Note on Our Dummy Data:

The initial values set in the Outcome and Suboutcome tables reflect the learning outcomes of our accreditation agency. If you run the application, make a project, and click on an assessment form, you’re seeing the learning outcomes we were asked to initially include. Consider these as a jumping off point for your application, and hard code your own initial values. Don’t worry, you can always change these values later!

Additionally, our ‘Update Outcomes’ tab is designed to reflect the common standard of ABET accreditation naming conventions: an integer Outcome and individual scores for that outcome ‘suboutcomes’ as floats increasing by tenths. (e.g., if Outcome 1 has two suboutcomes, they will be scores 1.1 and 1.2). This may be limiting to your application, but you can always add to or change our initial design to suit your needs.

We’ve included a user manual after the set up notes that will make this more clear.

## Setting up your environment:

After cloning our application, make sure you have the technologies in the “Technologies Used” section installed in our environment. Run ‘npm i’ in the directories with package.json files. At this point, you should be able to run ‘ng serve’ from the ‘frontend/cams’ directory. If you see an Auth0 login screen, everything’s going swell! You just need to refer to the youtube video under third party information, set up an Auth0 account, and change our variables to your own where appropriate. 
After you are confident that you’ve set up your variables, you’re ready to set up your database!
NOTE: don’t make an account on this screen just yet, or you won’t see anything! Our system checks the auth0 email of the person signing in and checks it against the current allowed graders in our database.

### Setting up your local Postgres Database:

Change your directory to ‘database’, and enter ‘npm run build’. This is a typical npm script that runs a couple of commands. You can track down exactly what’s it’s doing if you follow the files npm is being told to run, but essentially it’s doing four things:

Setting up a user in your database for development and testing called ‘cams’ with permission read and write to .csv files
Setting up a database owned by that user, also called ‘cams’
Setting up the schema for the cams database
Having the new user, ‘cams’, build the cams database with dummy data read from .csv files that you can inspect before the command. They are ‘prof.csv’, ‘project.csv’, and ‘student.csv’

You’ll be prompted for your local postgres password as well the password for the newly created user. If this is happening, everything’s going right!

NOTE: details and permissions for the user ‘cams’ can be found in ‘database/set_up/create_admin’ The placeholder password on our github is ‘pswd’. The routes that express uses to enter the database by using that user are only called when the application is being run in development mode. With all that being said, it is always best if you change the placeholder password to something more secure. You should update this password in the file ‘backend/routes’. This is only meant to quickly create or wipe a database for testing purposes, and this plain-text password method is not used when we deploy a branch and should never be used in actual production. This method of creating a database is not intended to be run in an enterprise database or a database that is storing critical information.

### Backend:

Running our local API is as easy as running ‘npm run serve’. This script will run ts-node-dev, a great tool for running node applications that restarts the backend whenever changes are made.

### Adding your first Auth0 user:

The only additional information you need to run our application is to invite a user from your Auth0 dashboard. On the side, you’ll see a tab for ‘User Management’ with a dropdown option ‘Users’. Click here.




[![Image from Gyazo](https://i.gyazo.com/481ff567a3dff1ba33191ccfbaf67194.png)](https://gyazo.com/481ff567a3dff1ba33191ccfbaf67194)

You’ll see at the top-center-right of the next page a purple button called ‘Create User’. We already have a user in our database with admin privileges with the email address admin@admin.com. Create that user and set their password. You can now log into the system with that password!
NOTE: this is intended to be an ‘invite only’ application (very fancy, we know). If you’d like to set up your application that way, click on the ‘Database’ option on the Auth0 sidebar




[![Image from Gyazo](https://i.gyazo.com/d63ad3d86013e171716d0d0f09327418.png)](https://gyazo.com/d63ad3d86013e171716d0d0f09327418)

From this screen, click ‘Username-Password-Authentication’



[![Image from Gyazo](https://i.gyazo.com/43a76057184a788a3546ccea61ad6f8a.png)](https://gyazo.com/43a76057184a788a3546ccea61ad6f8a)

 and then scroll down to the “Disable Sign Ups” container and toggle it on.



[![Image from Gyazo](https://i.gyazo.com/98d2c1326b3d8c54343dcc76865d3f67.png)](https://gyazo.com/98d2c1326b3d8c54343dcc76865d3f67)

# Set up completion:

Everything should be all clear for you to check out the CAMS system! You should absolutely check out the user manual below for more detailed information on the scope of this application and its intended use.

Below is the user manual we wrote for the University of Alaska Engineering Department. The doc explains how the application is intended to be used.

[CAMS User Manual](https://docs.google.com/document/d/1349ghwB87jCgqbtXg-8pQQx5EqI6P7QMIcsNknzSTo8/edit?usp=sharing)

# License

MIT License

Copyright (c) 2021 Phillip Drennan & Jessica Huezo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.