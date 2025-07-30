import { createReducer, on } from "@ngrx/store";
import { UserActions } from "./users.actions";
import { User } from "../../user.interface";

export const initialState: { users: User[] } = {
    users: [],
};

export const userReducer = createReducer(
    initialState,
    on(UserActions.set, (state, payload) => ({
        ...state,
    })),
    on(UserActions.edit, (state, payload) => ({
        ...state,
        users: state.users.map((user) => {
            if (user.id === payload.user.id) {
                return payload.user;
            } else {
                return user;
            }
        }),
    })),
    on(UserActions.create, (state, payload) => ({
        ...state,
        users: [...state.users, payload.user],
    })),
    on(UserActions.delete, (state, payload) => ({
        ...state,
        users: state.users.filter((user) => user.id !== payload.id),
    }))
);
