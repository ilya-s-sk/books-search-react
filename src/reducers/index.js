const initialState = {
    searchText: '',
    orderBy: 'relevance',
    category: 'all',
    startIndex: 30,
    books: [],
    totalItems: null,
    loading: false,
    error: false, 
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SEARCH_TEXT_ENTER':
            return {
                ...state,
                searchText: action.payload
            }
        case 'ORDER_SELECTED':
        return {
            ...state,
            orderBy: action.payload
        }
        case 'CATEGORY_SELECTED':
        return {
            ...state,
            category: action.payload
        }
        case 'BOOKS_LOADED':
            return {
                ...state,
                books: action.payload.items ? action.payload.items : [],
                totalItems: action.payload.totalItems,
                startIndex: 30,
                loading: false,
                error: false
            };
        case 'BOOK_LOADED':
            return {
                ...state,
                books: [action.payload],
                loading: false,
                error: false
            }
        case 'BOOKS_REQUESTED':
            return {
                ...state,
                loading: true
            };
        case 'BOOKS_ERROR':
            return {
                ...state,
                loading: false,
                error: true
            };
        case 'INCREASE_START_INDEX':
            return {
                ...state,
                startIndex: state.startIndex + 30
            }
        case 'MORE_BOOKS_LOADED':
            return {
                ...state,
                books: action.payload ? [...state.books, ...action.payload] : state.books,
                loading: false
            }
        case 'BOOKS_CLEARED':
            return {
                ...initialState
            }

        default:
            return state;
    }
}

export default reducer;