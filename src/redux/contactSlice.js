import { createSlice } from '@reduxjs/toolkit';
// import persistReducer from 'redux-persist/es/persistReducer';
// import storage from 'redux-persist/lib/storage';
import { fetchContacts, addContacts, deleteContact } from './operations';

const handlePending = state => {
    state.isLoading = true;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

export const contactSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        isLoading: false,
        error: null
    },
    extraReducers: {
        //fetch
        [fetchContacts.pending]: handlePending,
        [fetchContacts.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items = action.payload;
        },
        [fetchContacts.rejected]: handleRejected,

        //add
        [addContacts.pending]: handlePending,
        [addContacts.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items.push(action.payload);
        },
        [addContacts.rejected]: handleRejected,

        //delete
        [deleteContact.pending]: handlePending,
        [deleteContact.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            const idx = state.items.findIndex(({ id }) => id === action.payload.id);
            state.items.splice(idx, 1);
        },
        [deleteContact.rejected]: handleRejected,
    }
});

// const persistConfig = {
//     key: 'contacts',
//     storage,
// };

export const contactsReducer = contactSlice.reducer;



// const handleFetchContacts = (state, action) => {
//   state.items = action.payload;
// };

// const handleAddContacts = (state, action) => {
//   state.items.push(action.payload);
// };

// const handleDeleteContacts = (state, action) => {
//   const idx = state.items.findIndex(({ id }) => id === action.payload.id);
//   state.items.splice(idx, 1);
// };

// const actions = [fetchContacts, addContacts, deleteContact];

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: {
//     items: [],
//     isLoading: false,
//     error: null,
//   },
//   extraReducers: builder =>
//     builder
//       .addCase(fetchContacts.fulfilled, handleFetchContacts)
//       .addCase(addContacts.fulfilled, handleAddContacts)
//       .addCase(deleteContact.fulfilled, handleDeleteContacts)
//       .addMatcher(
//         isAnyOf(...actions.map(action => action.fulfilled)),
//         state => {
//           state.isLoading = false;
//           state.error = null;
//         }
//       )
//       .addMatcher(isAnyOf(...actions.map(action => action.pending)), state => {
//         state.isLoading = true;
//       })
//       .addMatcher(
//         isAnyOf(...actions.map(action => action.rejected)),
//         (state, action) => {
//           state.isLoading = false;
//           state.error = action.payload;
//         }
//       ),

  
// });

// export const contactsReducer = contactsSlice.reducer;