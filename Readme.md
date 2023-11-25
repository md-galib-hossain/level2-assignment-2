1. First download the git repository
2. Run command npm install to install the dependency packages
3. create an .env file and add this environment NODE_ENV=developement
    PORT=5000
    DATABASE_URL=mongodb+srv://yourdbusername:yourdbuserpassword@cluster0.fkxltzv.mongodb.net/second-assignment?retryWrites=true&w=majority

4. run tsc --watch & run in another command nodemon dist/server.js
