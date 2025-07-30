import { createSelector } from "@ngrx/store";
import { Todo } from "../../todo.interface";

interface TodoState {
    todos: Todo[];
}

interface AppState {
    todos: TodoState;
}

export const selectorFeature = (state: AppState) => state.todos;

export const selectorTodos = createSelector(
    selectorFeature,
    (state: TodoState) => state.todos
);
