export declare class TaskCreateManyInput {
    id?: string | undefined;
    title: string;
    subtitle?: string | undefined;
    notes?: string | undefined;
    completed?: boolean | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    authorId: string;
}
