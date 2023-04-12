// component/redux/slice/userData.tsx
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialUserState, User } from "../state/stateType"
import { RootState } from "../store/store";

export const userData = createSlice({
    name: 'userData',
    initialState: initialUserState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            // state = action.payload;
            // return state;
            console.log('setUser', action.payload)
            return action.payload
        }
    },

    extraReducers: (builder) => {
        builder
    }
})
export const { setUser } = userData.actions

export const selectUserData = (state: RootState) => state.userData

export default userData.reducer