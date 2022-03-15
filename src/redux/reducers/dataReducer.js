import {
  GET_DATA,
  POST_DATA,
  SORT_BY_DATE,
  SORT_BY_LIKE,
  SORT_BY_COMMENT,
  SORT_BY_RANDOM,
  ADD_COMMENT,
  TOGGLE_LIKE,
  RESET_DATA,
} from '../actions';
import { initialState } from './initialState';

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_DATA: {
      return {
        ...state,
        data: [...state.data, action.post],
      };
    }
    case GET_DATA: {
      return {
        ...state,
        length: state.length + 9,
      };
    }
    case RESET_DATA: {
      const data = state.data.slice(0, 19);
      return {
        ...state,
        data,
        length: 18,
      };
    }
    case SORT_BY_DATE: {
      const data = [...state.data];
      data.sort((a, b) => b.createDt - a.createDt);
      return {
        ...state,
        data,
      };
    }
    case SORT_BY_LIKE: {
      const data = [...state.data];
      data.sort((a, b) => b.likeCnt - a.likeCnt);
      return {
        ...state,
        data,
      };
    }
    case SORT_BY_COMMENT: {
      const data = [...state.data];
      data.sort((a, b) => b.comments.length - a.comments.length);
      return {
        ...state,
        data,
      };
    }
    case SORT_BY_RANDOM: {
      const data = [...state.data];
      data.sort(() => Math.random() - 0.5);
      return {
        ...state,
        data,
      };
    }
    case ADD_COMMENT: {
      const comment = state.data.map(item => {
        if (item.id === action.id) {
          return {
            ...item,
            comments: [
              ...item.comments,
              {
                commentId: action.userId,
                comment: action.text,
                commentDt: action.date,
              },
            ],
          };
        }
        return item;
      });
      return {
        ...state,
        data: comment,
      };
    }
    case TOGGLE_LIKE: {
      const updatedData = state.data.map(item => {
        if (item.id === action.id) {
          if (item.isClicked === true) {
            return {
              ...item,
              likeCnt: Number(item.likeCnt) - 1,
              isClicked: false,
            };
          } else {
            return {
              ...item,
              likeCnt: Number(item.likeCnt) + 1,
              isClicked: true,
            };
          }
        } else {
          return item;
        }
      });
      return {
        ...state,
        data: updatedData,
      };
    }
    default: {
      return state;
    }
  }
};
