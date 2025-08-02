export interface Todo {
    "userId": number,
    "id": number,
    "title": string,
    "completed": boolean,
}

export interface CreateTodoFormData {
    title: string;
    userId: string;
    completed: boolean;
}
