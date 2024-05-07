import { ADD_ITEM, EDIT_ITEM, CANCEL_EDIT_ITEM, UPDATE_ITEM, DELETE_ITEM, SET_FILTER } from "./actions";

const initialState = {
  items: [],
  editingItem: null,
  filter: "",
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case EDIT_ITEM:
      return {
        ...state,
        editingItem: action.payload,
      };
    case CANCEL_EDIT_ITEM:
      return {
        ...state,
        editingItem: null,
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) => item.id === action.payload.id ? action.payload : item),
        editingItem: null,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item !== action.payload),
        editingItem: state.editingItem === action.payload ? null : state.editingItem,
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      }
    default:
      return state;
  }
};

export default itemReducer;
