import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import AddBook from './AddBook'

class BooksApp extends Component {
  state = {
      books: []
  }

  componentDidMount() {
      BooksAPI.getAll().then((books) => {
          this.setState({ books })
      })
  }
  
  updateBook = (book, value) => {
      BooksAPI.update(book, value).then(() => {

          this.setState((prevState) => {

              let newBooks;

              console.log('1',book.shelf )
              book.shelf = value;

              console.log('2',book.shelf )

              // 获取除了当前操作的图书的所有其它图书
              const restOfBooksInShelf = prevState.books.filter(
                (preBook) => (preBook.id !== book.id)
              );

              if (value !== "none") {
                  // 如果对图书所做的操作不是从书架移除，那么将这本书合并到 restOfBooksInShelf 中并返回一个全新的图书数组
                  newBooks = restOfBooksInShelf.concat([book]);
              } else {
                  newBooks = restOfBooksInShelf;
              }
              // 更新数据并渲染界面
              return {
                books: newBooks
              };
          })
      })
  }

  render() {

    return (
        <div>
            <Route exact path='/' render={() => (
                <ListBooks 
                    books={this.state.books}
                    onUpdateBook={this.updateBook}
                />
            )}/>
            <Route path='/add' render={() => (
                <AddBook
                    books={this.state.books}
                    onUpdateBook={(book, value) => {
                        this.updateBook(book, value)
                    }}
                />
            )}/>
        </div>
    )
  }
}

export default BooksApp
