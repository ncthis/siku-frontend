import createHistory from 'history/createBrowserHistory';
import isTest from '../../utils/isTest';

export default (isTest ? {} : createHistory());
