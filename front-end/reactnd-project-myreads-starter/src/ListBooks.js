import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'


class ListBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    render() {
        const { books, onUpdateBook } = this.props

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <BookShelf 
                                    shelfBooks={books}
                                    queryBooks={books}                                      
                                    type="currentlyReading"
                                    onUpdateBook={onUpdateBook}
                                />
                            </div>
                        </div>

                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <BookShelf 
                                    shelfBooks={books}
                                    queryBooks={books}                                   
                                    type="wantToRead"
                                    onUpdateBook={onUpdateBook}
                                />
                            </div>
                        </div>

                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <BookShelf 
                                    shelfBooks={books}
                                    queryBooks={books}
                                    type="read"
                                    onUpdateBook={onUpdateBook}
                                />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="open-search">
                    <Link to='/add'>Add a book</Link>
                </div>            
            </div>

        )
    }
}

export default ListBooks

