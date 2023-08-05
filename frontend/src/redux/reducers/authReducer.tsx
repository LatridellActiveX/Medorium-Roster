import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AuthReducerStateType = {
    //false means a user is unauthorized
    //null means there was no auth check yet
    username: string | null | false //if there is username, the user is authorized 
}

//Initial state object to be used with the slice
const initialState: AuthReducerStateType = {
    username: null
};

/** 'auth' Slice to authorize usernames?
 * @property 'auth', name of slice.
 * @state initialState; Initial state of slice
 * @reducers reducers-> authorizeUser(state, action: PayloadAction<string | false> =>{state.username = action.payload;})
 * @Payload string or false
 */
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