import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {searchTextEnter, orderSelected, categorySelected, booksRequested, booksLoaded, booksError} from '../../actions'

import './search-panel.scss';
import Background from './bgc.jpg';

function SearchPanel({
            searchText, orderBy, category, 
            searchTextEnter, orderSelected, categorySelected, booksRequested, booksLoaded, booksError, 
            loading, error}) {

    function onSearchChange(e) {
        searchTextEnter(e.target.value)
    }

    function onOrderSelected(e) {
        orderSelected(e.target.value)
    }

    function onCategorySelected(e) {
        categorySelected(e.target.value)
    }

    async function getBooks(searchText, orderBy, category) {
        const searchString = category === 'all' 
                            ? `${searchText}&orderBy=${orderBy}` 
                            : `subject:${category}+${searchText}&orderBy=${orderBy}`;

        return await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchString}&maxResults=30&key=AIzaSyAWHSS_z2aDKUVsCSWiXBPgKHtsfFacIH0`)
        .then(res => res.json())
    }

    function startSearch(e) {
        e.preventDefault()
        booksRequested();
        getBooks(searchText, orderBy, category)
            .then(res => booksLoaded(res))
            .catch(err => booksError());  ;
    }

    return (
        <div className="search-panel" style={{background: `url(${Background}) center center/cover no-repeat`}}>
            <Link to='/' className="search-panel__title">Search for books</Link>

            <form onSubmit={startSearch} className="search-panel__form">
                <div className="search-panel__search_block">
                    <input  type="text" 
                            className="search-panel__search_block__input"
                            value={searchText}
                            onChange={onSearchChange}
                            />
                    <button className="search-panel__search_block__btn" type="submit">Search</button>
                </div>
                
                <div className="search-panel__selected-block">
                    <div className="search-panel__selected-block__block">
                        <p className="search-panel__selected-block__text">Categories</p>
                        <select value={category} onChange={onCategorySelected} className="search-panel__selected-block__select">
                            <option value="all">All</option>
                            <option value="art">art</option>
                            <option value="biography">biography</option>
                            <option value="computers">computers</option>
                            <option value="history">history</option>
                            <option value="medical">medical</option>
                            <option value="poetry">poetry</option>
                        </select>
                    </div>
                    <div className="search-panel__selected-block__block">
                        <p className="search-panel__selected-block__text">Sorting by</p>
                        <select value={orderBy} onChange={onOrderSelected} className="search-panel__selected-block__select">
                            <option value="relevance">Relevance</option>
                            <option value="newest">Newest</option>
                        </select>
                    </div>
                </div>
                
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        searchText: state.searchText,
        orderBy: state.orderBy,
        category: state.category,
        loading: state.loading,
        error: state.error
    }
}
const mapDispatchToProps = {
    searchTextEnter,
    orderSelected,
    categorySelected,
    booksRequested,
    booksLoaded,
    booksError
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel)