import React from 'react';
import PropTypes from 'prop-types'


function BookShelf(props) {

    let preHander = function(books) {

        if (books.length === 0) return books

        books.forEach((book) => {
            if(!book.imageLinks)  book.imageLinks = {thumbnail: ''};    
        })

        return books;
    }

    const { shelfBooks, type, onUpdateBook } = props

    return (
        <ol className="books-grid">
            {preHander(shelfBooks).filter((book) => (book.shelf.indexOf(type) !== -1)).map((book) => (
                <li key={book.id}>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                                <select value={book.shelf} onChange={e => onUpdateBook(book, e.target.value)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                    </div>
                </li>
            ))}
        </ol>
    )

}

BookShelf.propTypes = {
    shelfBooks: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    onUpdateBook: PropTypes.func.isRequired
}

export default BookShelf
