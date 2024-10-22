import { StateCreator } from "zustand";
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService.ts";
import { Categories, Drink, FilterAPI, Recipe, SearchFilter } from '../types'
import { FavoriteSliceType } from "./favoritesSlice.tsx";


export type RecipesSliceType = {
    categories: Categories,
    drinks: FilterAPI,
    selectedRecipe: Recipe,
    modal: boolean,
    fetchCategories(): Promise<void>,
    searchRecipies(searchFilters: SearchFilter): Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>,
    closeModal: () => void
}

export const createRecipesSlice: StateCreator<RecipesSliceType/*Esta es la forma para tipar con el anidado de slices*/ & FavoriteSliceType, [], [], RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    modal: false
    ,
    fetchCategories: async () => {
        const categories = await getCategories();
        set({
            categories
        })
    },
    searchRecipies: async (filters) => {
        const drinks = await getRecipes(filters)
        set({
            drinks
        })
    },
    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipeById(id)
        set({
            selectedRecipe,
            modal: true
        })
    },
    closeModal: () => {
        set(
            {
                modal: false,
                selectedRecipe: {} as Recipe
            }
        )
    }
})
