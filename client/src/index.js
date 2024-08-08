import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "state/api";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice } from "state/redux/reducer";

// Create a Redux Persist configuration object
const persistConfig = {
  key: "authKey", // The key to use for storing the data in the storage
  storage, // Use localForage as the storage engine
  whitelist: ["auth"], // Add the names of slices you want to persist here
  blacklist: [],
};

// Wrap the authSlice.reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

// Configure the Redux store
const store = configureStore({
  reducer: {
    global: persistedReducer, // The "global" slice of the state managed by the "authSlice" reducer with Redux Persist
    [api.reducerPath]: api.reducer, // The slice of the state managed by the "api" reducer
  },
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

// Create the Redux Persistor
let persistor = persistStore(store);

setupListeners(store.dispatch);

// Render the React application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
