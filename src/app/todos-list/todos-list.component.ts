import { NgFor } from "@angular/common";
import { Component, inject } from "@angular/core";
import { TodosApiService } from "../todos-api.service";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy } from "@angular/core";
import { CreateTodoFormComponent } from "../create-todo-form/create-todo-form.component";
import { Store } from "@ngrx/store";
import { Todo } from "../todo.interface";
import { TodoActions } from "./store/todo.actions";
import { selectorTodos } from "./store/todos.selectors";

@Component({
    selector: 'app-todos-list',
    templateUrl: './todos-list.component.html',
    styleUrl: './todos-list.component.scss',
    imports: [NgFor, TodoCardComponent, AsyncPipe, CreateTodoFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodosListComponent {
    readonly todosApiService = inject(TodosApiService);
    private readonly store = inject(Store);
    public readonly todos$ = this.store.select(selectorTodos);

    constructor() {
        this.todosApiService.getTodos().subscribe((response: any) => {
            this.store.dispatch(TodoActions.set({ todos: response as Todo[] }));
        });
    }

    deleteTodo(id: number) {
        this.store.dispatch(TodoActions.delete({ id }));
    }

    public createTodo(formData: any) {
        this.store.dispatch(TodoActions.create({
            todo: {
                id: new Date().getTime(),
                title: formData.title,
                userId: formData.userId,
                completed: formData.completed,
            }
        }));
    }

    editTodo(todo: Todo) {
        this.store.dispatch(TodoActions.edit({ todo }));
    }

    getTodosAuthor(id: number) {
        // Реализация по необходимости
    }
}

