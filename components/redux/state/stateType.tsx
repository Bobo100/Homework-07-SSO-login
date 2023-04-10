// components/redux/state/stateType.tsx

import { User } from "firebase/auth"

export interface AuthenticationState {
    user: User | null;
}

export const initialState: AuthenticationState = {
    user: null
}

export interface userDataState {
    displayName: string | null;
    email: string;
}