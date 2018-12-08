import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import * as _ from 'lodash';

class AddBook extends Component {
    
    static propTypes = {
        shelfBooks: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    state = {
        query: '',
        queryBooks: []
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

    
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
        this.showingBooks(query)
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    handleSearch = _.debounce(query => {
        this.updateQuery(query)
    }, 40)

    showingBooks = (query) => {

        BooksAPI.search(query).then((resultList) => {

            this.setState({
                queryBooks: []
            })

            if(resultList) {
                if (!resultList.error) {
                    this.setState({queryBooks: this.preHander(resultList)})
                }
            }
            else {
               this.setState({
                 queryBooks: []
               }) 
            }
        }).catch((e) => {console.log(e)})    
    }

    render () {
        const { onUpdateBook } = this.props
        const { query, queryBooks } = this.state

        return (
            <div className="app">
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" to='/'>Close</Link>
                        <div className="search-books-input-wrapper">
                            <input 
                                type="text" 
                                placeholder="Search by title or author"
                                value={query}
                                onChange={(event) => (this.handleSearch(event.target.value))}
                            />
                        </div>
                    </div>
                    <div className="search-books-results">

                        <ol className="books-grid">
                            {queryBooks.map((book) => (
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


                    </div>
                </div>
            </div>
        )
    }

}

export default AddBook