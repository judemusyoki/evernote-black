import { TaskCountOrderByAggregateInput } from "../inputs/TaskCountOrderByAggregateInput";
import { TaskMaxOrderByAggregateInput } from "../inputs/TaskMaxOrderByAggregateInput";
import { TaskMinOrderByAggregateInput } from "../inputs/TaskMinOrderByAggregateInput";
export declare class TaskOrderByWithAggregationInput {
    id?: "asc" | "desc" | undefined;
    title?: "asc" | "desc" | undefined;
    subtitle?: "asc" | "desc" | undefined;
    notes?: "asc" | "desc" | undefined;
    completed?: "asc" | "desc" | undefined;
    createdAt?: "asc" | "desc" | undefined;
    updatedAt?: "asc" | "desc" | undefined;
    authorId?: "asc" | "desc" | undefined;
    _count?: TaskCountOrderByAggregateInput | undefined;
    _max?: TaskMaxOrderByAggregateInput | undefined;
    _min?: TaskMinOrderByAggregateInput | undefined;
}
