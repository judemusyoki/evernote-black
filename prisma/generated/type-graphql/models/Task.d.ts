export declare class Task {
    id: string;
    title: string;
    subtitle?: string | null;
    notes?: string | null;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
}
