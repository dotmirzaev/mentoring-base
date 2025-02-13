import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";


@Component({
    selector: "app-todo-card",
    templateUrl: "./todo-card.component.html",
    styleUrls: ["./todo-card.component.scss"],
    standalone : true,
    imports: [ReactiveFormsModule]
})


export class TodoCardComponent {
    @Input()
    todo: any

    @Output()
    deleteTodo = new EventEmitter();

    onDeleteTodo(todoId: number) {
        this.deleteTodo.emit(todoId);
    }
}
