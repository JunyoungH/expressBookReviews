const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username, password)=>{ //returns boolean
  if (!username || !password) {
   return false;
  }
 
  return users.some((user) => user.username === username && user.password === password);
 }
 
 //only registered users can login
 regd_users.post("/login", (req,res) => {
   const { username, password } = req.body;
 
   if (!isValid(username, password)) {
     return res.status(400).json({message:"Check username and password"});
   }
 
   const accessToken = jwt.sign({ data: { username } }, 'secret', { expiresIn: 60 * 60});
   req.session.authorization = { accessToken　};
     
   res.send("User logged in Successfully")
 });

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.username;
  const contents = req.body.contents
  books[isbn].reviews[username] = {
    contents
  }

  return res.status(201).json({message:"Review added successfully"})
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.username;
  delete books[isbn].reviews[username];
  
  return res.status(200).json({messsage:"Review has been deleted"});
});

module.exports.isValid = isValid;
module.exports.authenticated = regd_users;
module.exports.users = users;
