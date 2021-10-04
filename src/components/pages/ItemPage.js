import React from 'react';

import {connect} from 'react-redux';
import { booksRequested, booksError, bookLoaded, clearBooks } from '../../actions';

import './item-page.scss';
import bookImg from './book.png'
import Spinner from '../spinner/spinner';
import Error from '../error/error';

class ItemPage extends React.Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        
        if (!this.props.books.length) {
            this.props.booksRequested()
            this.getBookById(id)
                .then(res => {
                    this.props.bookLoaded(res)
                })
                .catch(err => this.props.booksError());  
        } 
    }

    componentWillUnmount() {
        if (this.props.books.length === 1) this.props.clearBooks()
    }

    async getBookById(id) {
        return await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
                .then(res => res.json());
    }

    render() {
        if (this.props.loading) {
            return <Spinner/>
        }
        if (this.props.error) {
            return <Error/>
        }
        const item = this.props.books?.find(el => el.id === this.props.match.params.id);
        const book = item ? item.volumeInfo : 0;
        const {title, description} = book;
        const authors = book.authors?.join(', ');
        const categories = book.categories?.join(', ');
        const imageUrl = book.imageLinks ? book.imageLinks.thumbnail : bookImg;

        return (
            <div className = "item-page">
                <button onClick={this.props.history.goBack} className="item-page__back-btn">Go Back</button>
                <div className="item-page__img-block">
                    <img src={imageUrl} alt={title} className="item-page__img"></img>
                </div>
            
                <div className="item-page__text-block">
                    <p className="item-page__category">{categories}</p>
                    
                    <p className="item-page__title">{title}</p>
                    <p className="item-page__author">{authors}</p>
                
                    <p className="item-page__description">{description}</p>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        books: state.books
    }
}
const mapDispatchToProps = {
    booksRequested,
    booksError,
    bookLoaded,
    clearBooks
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);