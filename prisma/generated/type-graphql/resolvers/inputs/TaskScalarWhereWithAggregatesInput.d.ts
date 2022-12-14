import { BoolWithAggregatesFilter } from "../inputs/BoolWithAggregatesFilter";
import { DateTimeWithAggregatesFilter } from "../inputs/DateTimeWithAggregatesFilter";
import { StringNullableWithAggregatesFilter } from "../inputs/StringNullableWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";
export declare class TaskScalarWhereWithAggregatesInput {
    AND?: TaskScalarWhereWithAggregatesInput[] | undefined;
    OR?: TaskScalarWhereWithAggregatesInput[] | undefined;
    NOT?: TaskScalarWhereWithAggregatesInput[] | undefined;
    id?: StringWithAggregatesFilter | undefined;
    title?: StringWithAggregatesFilter | undefined;
    subtitle?: StringNullableWithAggregatesFilter | undefined;
    notes?: StringNullableWithAggregatesFilter | undefined;
    completed?: BoolWithAggregatesFilter | undefined;
    createdAt?: DateTimeWithAggregatesFilter | undefined;
    updatedAt?: DateTimeWithAggregatesFilter | undefined;
    authorId?: StringWithAggregatesFilter | undefined;
}
