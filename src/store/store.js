import { configureStore } from '@reduxjs/toolkit';

import rocketsReducer from './slices/rocketsSlice'
const store = configureStore({
    reducer: {
        // rockets: rocketsReducer,  // add the reducer here
        rockets:rocketsReducer
    },
});

export default store;
