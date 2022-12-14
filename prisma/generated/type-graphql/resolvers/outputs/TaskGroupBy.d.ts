import { TaskCountAggregate } from "../outputs/TaskCountAggregate";
import { TaskMaxAggregate } from "../outputs/TaskMaxAggregate";
import { TaskMinAggregate } from "../outputs/TaskMinAggregate";
export declare class TaskGroupBy {
    id: string;
    title: string;
    subtitle: string | null;
    notes: string | null;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    _count: TaskCountAggregate | null;
    _min: TaskMinAggregate | null;
    _max: TaskMaxAggregate | null;
}
