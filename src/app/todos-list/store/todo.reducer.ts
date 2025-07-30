import { createReducer, on } from "@ngrx/store";
import { TodoActions } from "./todo.actions";
import { Todo } from "../../todo.interface";

export const initialState: { todos: Todo[] } = {
    todos: [],
};

export const todoReducer = createReducer(
    initialState,
    on(TodoActions.set, (state, payload) => ({
        ...state,
    })),
    on(TodoActions.edit, (state, { todo }) => ({
        ...state,
        todos: state.todos.map((item) => {
            if (item.id === todo.id) {
                return todo;
            } else {
                return item;
            }
        }),
    })),
    on(TodoActions.create, (state, { todo }) => ({
        ...state,
        todos: [...state.todos, todo],
    })),
    on(TodoActions.delete, (state, { id }) => ({
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id),
    }))
);