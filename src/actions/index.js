const searchTextEnter = (searchText) => {
    return {
        type: 'SEARCH_TEXT_ENTER',
        payload: searchText
    }
}

const orderSelected = (selectedOrder) => {
    return {
        type: 'ORDER_SELECTED',
        payload: selectedOrder
    }
}

const categorySelected = (selectedCategory) => {
    return {
        type: 'CATEGORY_SELECTED',
        payload: selectedCategory
    }
}

const booksLoaded = (res) => {
    return {
        type: 'BOOKS_LOADED',
        payload: res
    }
};

const bookLoaded = (res) => {
    return {
        type: 'BOOK_LOADED',
        payload: res
    }
}

const booksRequested = () => {
    return {
        type: 'BOOKS_REQUESTED'
    }
};

const booksError = () => {
    return {
        type: 'BOOKS_ERROR'
    }
};

const increaseStartIndex = () => {
    return {
        type: 'INCREASE_START_INDEX'
    }
}

const moreBooksLoaded = (res) => {
    return {
        type: 'MORE_BOOKS_LOADED',
        payload: res.items
    }
}

const clearBooks = () => {
    return {
        type: 'BOOKS_CLEARED'
    }
}


export {
    searchTextEnter,
    orderSelected,
    categorySelected,
    booksLoaded,
    bookLoaded,
    booksRequested,
    booksError,
    increaseStartIndex,
    moreBooksLoaded,
    clearBooks
}