import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import * as _ from 'lodash';

class AddBook extends Component {
    
    static propTypes = {
        onUpdateBook: PropTypes.func.isRequired
    }

    state = {
        query: '',
        queryBooks: []
    }

    componentWillReceiveProps(nextProps) {
        this.setState({queryBooks: nextProps.books});
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
                    this.setState({queryBooks: resultList})
                }
            }
            else {
               this.setState({
                 queryBooks: []
               }) 
            }
        })        
    }

    render () {
        const { books, onUpdateBook } = this.props
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
                        <BookShelf 
                            shelfBooks={books}
                            queryBooks={queryBooks}
                            type=""
                            onUpdateBook={onUpdateBook}
                        />
                    </div>
                </div>
            </div>
        )
    }

}

export default AddBook