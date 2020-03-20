import { PipeTransform, BadRequestException} from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ];

    transform(value: any) {
        const status = value.toUpperCase();
        if(!this.isStatusValid(status)){
            throw new BadRequestException(`"${value}" is invalid status`);
        }
        return status
    }
    
    private isStatusValid(status:any) {
        const idx = this.allowedStatuses.indexOf(status);
        return idx > -1;
    }
}