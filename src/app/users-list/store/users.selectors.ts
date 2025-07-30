import { createSelector } from "@ngrx/store";
import { User } from "../../user.interface";

interface UserState {
    users: User[];
}

interface AppState {
    users: UserState;
}

export const selectorFeature = (state: AppState) => state.users;

export const selectorUsers = createSelector(
    selectorFeature,
    (state: UserState) => state.users
)