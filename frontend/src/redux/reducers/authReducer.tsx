import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AuthReducerStateType = {
    userId: number | null //if there is userId, the user in authorized 
}

const initialState: AuthReducerStateType = {
    userId: null    
};

type AuthorizeUserPayloadType = {
    userId: number
    //something else later...
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorizeUser: (state, action: PayloadAction<AuthorizeUserPayloadType>) => {
        state.userId = action.payload.userId
    },
  },
});

export const { authorizeUser } = authSlice.actions;

export default authSlice.reducer;