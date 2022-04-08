import {configureStore, combineReducers} from '@reduxjs/toolkit';
import loginSlice from './screens/login/loginSlice';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import homeSlice from './screens/Home/homeSlice';
import detailBookSlice from './screens/detailBook/detailBookSlice';
const reducers = combineReducers({
  login: loginSlice,
  book: homeSlice,
  detailBook: detailBookSlice,
});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: ['login'],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({reducer: persistedReducer});
const persistor = persistStore(store);
export {store, persistor};
