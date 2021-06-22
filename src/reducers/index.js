const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: []
}

const reducer = (state = initialState, action) => {
    console.log(state)
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false
            };

        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true
            }

        case 'MENU_ERROR':
            return {
                ...state,
                menu: state.menu,
                loading: state.loading,
                error: true
            }

        case 'ITEM_ADD_TO_CART':
            const id = action.payload;
            const item = state.menu.find(item => item.id === id);
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id
            }; 

            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ]
            };

        case 'ITEM_REMOVE_FROM_CART':
            const index = action.payload;
            const newItems = state.items.filter(item => item.id !== index);
            return {
                ...state,
                items: [
                    ...newItems
                ]
            }
        
        default:
            return state;
    }
}

export default reducer;