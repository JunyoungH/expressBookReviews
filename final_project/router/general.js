const express = require('express');
let books = require("./booksdb.js");
let users = require("./auth_users.js").users;
const public_users = express.Router();
const service = require("./service.js").service;

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if(!username || !password){
    return res.status(400).json({message:"Check username and password"});
  }

  const user = users.filter((item) => item.username === username);
  
  if (user.length > 0) {
    return res.status(400).json({message:"Already exists"});
  }

  users.push({
    username,
    password
  });

  return res.status(201).json({message:"User created successfully"});
});

// Get the book list available in the shop
public_users.get('/', async (req, res) => {
  const books = await service.getAllBooks()

  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
  const books = await service.getBookByIsbn(req.params.isbn)

  return res.status(200).json(books);
 });
  
// Get book details based on author
public_users.get('/author/:author', async (req, res) => {
  const books = await service.getBooksbyAuthor(req.params.author)

  return res.status(200).json(books);
});

// Get all books based on title
public_users.get('/title/:title', async (req, res) => {
  const books = await service.getBookByTitle(req.params.title)

  return res.status(200).json(books);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn

  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
