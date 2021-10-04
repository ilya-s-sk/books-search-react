import './book-item.scss';
import bookImg from './book.png'

import {Link} from 'react-router-dom';

function BookItem({book, route}) {
    const {title} = book;
    const authors = book.authors?.join(', ');
    const categories = book.categories?.[0];
    const imageUrl = book.imageLinks ? book.imageLinks.thumbnail : bookImg;
    
    return (
        // <div className="book-item">
            <Link to={`/${route}`} className="book-item">
                                                    
            <div className="book-item__img-block">
                <img src={imageUrl} alt={title} className="book-item__img"></img>
            </div>
            
            <p className="book-item__author">{authors}</p>
            <p className="book-item__title">{title}</p>
            
            <p className="book-item__category">{categories}</p>
            </Link>
        // </div>
    )
}

export default BookItem