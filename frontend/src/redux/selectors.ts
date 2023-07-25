import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

const selectSelf = (state: RootState) => state;

//auth reducer
export const selectUserId = createDraftSafeSelector(selectSelf, state => state.auth.username);
