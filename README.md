# Short URL generator

## Functionality
- Generate a short URL for input URL
- Look up your generation history

## How to start
1. Make sure node.js and MongoDB have been installed
2. Under the directory, input the following command:
   ```bash
   npm install
   ```
3. Upon installation, enter:
   ```bash
   node app
   ```
4. Message below indicates the server is working
   ```bash
   Listening on port 3000
   Connected to mongodb
   ```
5. Press ctrl + c to leave

## Dependencies
- "ejs": "^3.1.9",
- "express": "^4.18.2",
- "express-session": "^1.17.3",
- "mongoose": "^7.6.0"