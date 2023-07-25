import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AuthReducerStateType = {
    username: string | null //if there is username, the user in authorized 
}

const initialState: AuthReducerStateType = {
    username: null
};

type AuthorizeUserPayloadType = {
    username: string
    //something else later...
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authorizeUser: (state, action: PayloadAction<AuthorizeUserPayloadType>) => {
            state.username = action.payload.username
        },
    },
});

export const { authorizeUser } = authSlice.actions;

export default authSlice.reducer;