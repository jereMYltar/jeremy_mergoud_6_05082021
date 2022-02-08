# jeremy_mergoud_6_05082021

# Cloning this repository :
git clone https://github.com/jereMYltar/jeremy_mergoud_6_05082021.git
=> this will create a folder named 'jeremy_mergoud_6_05082021'

You can also download it.

# Prerequisites :
1. On Windows : Open Powershell as administrator ans then execute :
    set-executionpolicy unrestricted -s cu -f
2. Use Node 14.0.0 with the following commands :
    * nvm install 14.0.0
    * nvm use 14.0.0

# Installing the client server :
1. Open Powershell as administrator
2. Open the folder named 'jeremy_mergoud_6_05082021'
3. Open the 'frontend' folder, and then execute in a prompt :
    * npm install @angular/cli@7.0.2
    * npm install node-sass@4.9.4
    * npm install
    * npm start
4. The application will open and then reload automatically if you modify a source file

# Installing the backend server :
1. Open the folder named 'jeremy_mergoud_6_31072021'
2. Open the 'backend' folder, and then execute 'npm install' in a NEW prompt
3. In this prompt, execute : npm install -g nodemon
4. Then execute : nodemon server
5. The server will reload automatically if you modify a source file

# Create a .env file in the 'backend' folder
1. Respect the model file .env.model
2. In DB_PASS and DB_USER, fill in the password and the name of a valid user for your Mongo DB database
3. In DB_COLLECTION, fill in the name of your collection in your Mongo DB database
4. In JWT_SALT, fill in a salting key 