import {z} from 'zod'
import {
    CategoriesAPIResponseSchema,
    FilterAPIResponseSchema,
    FilterAPIResponsesSchema, RecipeAPIResponseSchema,
    SearchFilterSchema
} from "../utils/RecipesSchema.ts";

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
export type SearchFilter = z.infer<typeof SearchFilterSchema>
export type FilterAPI = z.infer<typeof FilterAPIResponsesSchema>
export type Drink = z.infer<typeof FilterAPIResponseSchema>
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>
