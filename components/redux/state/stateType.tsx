// components/redux/state/stateType.tsx

export interface User {
    displayName: string | null;
    email: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
}

export const initialUserState: User = {
    displayName: '',
    email: '',
    emailVerified: false,
    isAnonymous: false,
}
