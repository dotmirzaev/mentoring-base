import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { Todo } from '../../todo.interface';


@Component({
    selector: "app-todo-card",
    templateUrl: "./todo-card.component.html",
    styleUrls: ["./todo-card.component.scss"],
    standalone : true,
    imports: [ReactiveFormsModule, TruncatePipe]
})


export class TodoCardComponent {
    @Input()
    todo!: Todo;

    @Output()
    deleteTodo = new EventEmitter();

    onDeleteTodo(todoId: number) {
        this.deleteTodo.emit(todoId);
    }
}
