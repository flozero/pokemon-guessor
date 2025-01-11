export interface Quiz {
    id: string,
    users: string[],
    created_at: Date,
    errors: number,
    success: number,
    total_questions: number
}

export type QuizAPICreate = Omit<Quiz, "id" | "created_at">
export type QuizAPIGet = Quiz