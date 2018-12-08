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
      }).catch((e) => {console.log(e)})
  }
  
  updateBook = (book, value) => {
      BooksAPI.update(book, value).then(() => {

          this.setState((prevState) => {

              let newBooks;

              book.shelf = value;

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
      }).catch((e) => {console.log(e)})
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
                    shelfBooks={this.state.books}
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
