## NQH Chat App

========================================================

Install the npm package in project:
> npm install

Run project:
> npm start

--------------------------------------------------------
### Set Environment and Database

#### Step 1:


> Create **.env** file at root project.
> In **.env** file you will create firebase config variable (Get on firebase project).
```bash
REACT_APP_FIREBASE_API_KEY=.....
REACT_APP_FIREBASE_AUTH_DOMAIN=.....
REACT_APP_FIREBASE_PROJECT_ID=.....
REACT_APP_FIREBASE_DATABASE_URL=.....
REACT_APP_FIREBASE_STORAGE_BUCKET=.....
```
***Notes:*** *In React project the environment variable name must start with "REACT_APP_"*


#### Step 2:

>
> Create firebase real-time database on https://firebase.google.com/ (Follow the Firebase document)
>

Database structure:
```bash
+<--Project-name-databse-->
|
+--admins *()*
|  |
|  +--<--key-object-->
|      |
|      +--email: <--email-->
|      |
|      +--id: <--object-id-->
|
+--totalRoom: 0
```