import React, { Component } from 'react';
import PropTypes from 'prop-types'

class BookShelf extends Component {

    static propTypes = {
        shelfBooks: PropTypes.array.isRequired,
        queryBooks: PropTypes.array.isRequired,
        type: PropTypes.string.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    state = {
        reslutBooks: this.props.queryBooks
    }

    componentWillReceiveProps(nextProps) {
        this.setState({reslutBooks: nextProps.queryBooks});
    }

    preHander = function(books) {

        if (books.length === 0) return books

        books.forEach((book) => {
            if(!book.imageLinks)  book.imageLinks = {thumbnail: ''};    
        })
        
        if(books !== this.props.shelfBooks) {
            books.forEach( (book) => {
                for (var i = 0; i < this.props.shelfBooks.length; i++) {
                    if(this.props.shelfBooks[i].id === book.id) {
                        book.shelf = this.props.shelfBooks[i].shelf
                        continue;
                    }
                    else book.shelf = 'none'
                }
            })
        }
        return books;
    }

    render() {

        const { type, onUpdateBook } = this.props
        const { reslutBooks } = this.state

        return (
            <ol className="books-grid">
                {this.preHander(reslutBooks).filter((book) => (book.shelf.indexOf(type) !== -1)).map((book) => (
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
}

export default BookShelf

