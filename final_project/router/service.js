let books = require("./booksdb.js");

const service = {
    getAllBooks() {
        return new Promise(( resolve ) => {
            resolve(books)
        })
    },
    getBookByIsbn(isbn) {
        return new Promise(( resolve ) => {
            resolve(books[isbn])
        })
    },  
    getBooksbyAuthor(author) {
        return new Promise(( resolve ) => {
            resolve(Object.values(books).filter((item) => item.author === author ))
        })
    },
    getBookByTitle(title) {
        return new Promise(( resolve ) => {
            resolve(Object.values(books).filter((item) => item.title === title ))
        })
    }
}

module.exports.service = service