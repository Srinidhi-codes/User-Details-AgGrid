import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: [],
};

export const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        getAllUsers(state, action) {
            state.userData = action.payload;
        },
        updateUser(state, action) {
            const { id, updatedData } = action.payload;
            const index = state.userData.findIndex(user => user._id === id);
            if (index !== -1) {

                state.userData[index] = {
                    ...state.userData[index],
                    ...updatedData,
                };
            }
        },
    },
});

export const { getAllUsers, updateUser } = usersSlice.actions;

export default usersSlice.reducer;
