import BookItem from '../book-item/BookItem';
import Spinner from '../spinner/spinner';
import Error from '../error/error';

import {booksRequested, booksError, increaseStartIndex, moreBooksLoaded} from "../../actions";

import {connect} from 'react-redux';

import './books-list.scss';

function BooksList({
            searchText, orderBy, category, startIndex, books, totalItems, 
            loading, error, 
            increaseStartIndex, moreBooksLoaded, booksRequested, booksError
        }) {

    async function loadBooks(searchText, orderBy, category, startIndex) {
        const searchString = category === 'all' 
                            ? `${searchText}&orderBy=${orderBy}` 
                            : `subject:${category}+${searchText}&orderBy=${orderBy}`;

        return await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchString}&startIndex=${startIndex}&maxResults=30&key=AIzaSyAWHSS_z2aDKUVsCSWiXBPgKHtsfFacIH0`)
        .then(res => res.json())
    }

    function loadMore() {
        booksRequested();
        increaseStartIndex();
        loadBooks(searchText, orderBy, category, startIndex)
            .then(res => moreBooksLoaded(res))
            .catch(err => booksError());   
    }

    if (loading && !books.length) {
        return <Spinner/>
    }

    if (error && !books.length) {
        return <Error/>
    }

    return books.length 
        ? (<div className="list-main">
                {
                    books.length
                    ? <p className="books-list__text">Found <span className="books-list__text-result">{totalItems}</span> results</p>
                    : null
                } 
                <li className="books-list">
                    {
                        books.map(book => {
                            return (    
                                <BookItem book={book.volumeInfo}
                                            key={book.id}
                                            route={book.id} />)
                        })   
                    }
                </li>
                {
                    loading 
                    ? <Spinner/> 
                    : error  
                    ? <Error/>
                    : <button className="load-button" onClick={loadMore}>Load More</button>
                } 
            </div>)
    : null
    
}

const mapStateToProps = (state) => {
    return {
        searchText: state.searchText, 
        orderBy: state.orderBy, 
        category: state.category,
        startIndex: state.startIndex,
        books: state.books,
        totalItems: state.totalItems,
        loading: state.loading,
        error: state.error
    }
}
const mapDispatchToProps = {
    booksRequested,
    booksError,
    increaseStartIndex,
    moreBooksLoaded 
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
