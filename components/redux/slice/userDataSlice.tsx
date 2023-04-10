import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/init-firebase';
import { RootState } from '../store/store';
import { initialState } from '../state/stateType';


export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        removeUserData: (state) => {
            state.user = null;
        }
    }
});

export const { setUserData, removeUserData } = authSlice.actions;

export const selectAuthentication = (state: RootState) => state.authentication;

export default authSlice.reducer;