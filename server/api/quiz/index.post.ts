import { db } from "~/server/database/db"
import { GenericReturn } from "~/shared/types/genericReturn.types"
import { Quiz } from "~/shared/types/quiz.types"

export default defineEventHandler(async (): Promise<GenericReturn<Quiz>> => {
    const { data: quiz_data, error: quiz_error } = await db().create({
        "errors": 0,
        "success": 0,
        "total_questions": 10,
        "users": ["1"],
    })

    return {
        data: quiz_data,
        error: quiz_error
    }
  })