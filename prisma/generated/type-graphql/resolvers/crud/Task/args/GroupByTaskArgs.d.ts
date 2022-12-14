import { TaskOrderByWithAggregationInput } from "../../../inputs/TaskOrderByWithAggregationInput";
import { TaskScalarWhereWithAggregatesInput } from "../../../inputs/TaskScalarWhereWithAggregatesInput";
import { TaskWhereInput } from "../../../inputs/TaskWhereInput";
export declare class GroupByTaskArgs {
    where?: TaskWhereInput | undefined;
    orderBy?: TaskOrderByWithAggregationInput[] | undefined;
    by: Array<"id" | "title" | "subtitle" | "notes" | "completed" | "createdAt" | "updatedAt" | "authorId">;
    having?: TaskScalarWhereWithAggregatesInput | undefined;
    take?: number | undefined;
    skip?: number | undefined;
}
