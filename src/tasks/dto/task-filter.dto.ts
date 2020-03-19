import { TaskStatus } from "../tasks.model";

export class TaskFilterDto {
    status: TaskStatus;
    search: string;
}