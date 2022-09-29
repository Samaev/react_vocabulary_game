import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { wordsReducer } from "../features/utils";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  words: wordsReducer,
});

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;