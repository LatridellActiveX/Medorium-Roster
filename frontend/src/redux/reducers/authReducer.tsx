import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AuthReducerStateType = {
    //false means a user is unauthorized
    //null means there was no auth check yet
    username: string | null | false //if there is username, the user in authorized 
}

const initialState: AuthReducerStateType = {
    username: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authorizeUser: (state, action: PayloadAction<string | false>) => {
            state.username = action.payload; //username as payload
        },
    },
});

export const { authorizeUser } = authSlice.actions;

export default authSlice.reducer;