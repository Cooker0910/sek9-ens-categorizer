import {
  AUTH_TOKEN,
  AUTHENTICATED,
  SHOW_AUTH_MESSAGE,
  HIDE_AUTH_MESSAGE,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SHOW_LOADING,
  SET_ERROR,
  SIGNIN_WITH_GOOGLE_AUTHENTICATED,
  SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
  SET_FAVORITES,
  ADD_FAVORITE,
  REMOVE_FAVORITE
} from '../constants/Auth'

const initState = {
  loading: false,
  message: '',
  showMessage: false,
  redirect: '',
  token: null,
  //   token: localStorage.getItem(AUTH_TOKEN),
  member: {},
  favorites: [],
  error: {}
}

const auth = (state = initState, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        loading: false,
        redirect: '/',
        token: action.token,
        member: action.member
      }
    case SHOW_AUTH_MESSAGE:
      return {
        ...state,
        message: action.message,
        showMessage: true,
        loading: false
      }
    case HIDE_AUTH_MESSAGE:
      return {
        ...state,
        message: '',
        showMessage: false
      }
    case SIGNOUT_SUCCESS: {
      return initState
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.token
      }
    }
    case SHOW_LOADING: {
      return {
        ...state,
        loading: true
      }
    }
    case SIGNIN_WITH_GOOGLE_AUTHENTICATED: {
      return {
        ...state,
        loading: false,
        token: action.token
      }
    }
    case SET_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }
    case SET_FAVORITES: {
      return {
        ...state,
        favorites: action.favorites
      }
    }
    case ADD_FAVORITE: {
      const tmpFavorites = [...state.favorites]
      const index = tmpFavorites.findIndex(elm => elm.id === action.favorite.id)
      if (index >= 0) {
        tmpFavorites[index] = action.favorite
      } else {
        tmpFavorites.push(action.favorite)
      }
      console.log('add--', tmpFavorites)
      return {
        ...state,
        favorite: tmpFavorites
      }
    }
    case REMOVE_FAVORITE: {
      const tmpFavorites = [...state.favorites]
      return {
        ...state,
        favorite: tmpFavorites.filter(elm => elm.id !== action.favorite.id)
      }
    }
    case SIGNIN_WITH_FACEBOOK_AUTHENTICATED: {
      return {
        ...state,
        loading: false,
        token: action.token
      }
    }
    default:
      return state
  }
}

export default auth
