import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './features/categorySlice/categorySlice';
import productReducer from './features/productSlice/productSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    categories: categoriesReducer,
    products: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);