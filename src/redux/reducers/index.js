import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import Category from './Category';

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
    category: Category
});

export default reducers;