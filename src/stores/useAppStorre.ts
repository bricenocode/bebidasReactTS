import { create } from 'zustand'
import {devtools} from "zustand/middleware";
import {createRecipesSlice, RecipesSliceType} from "./recipeSlice.ts";
import {FavoriteSliceType ,createFavoriteSlice} from './favoritesSlice.ts'
import { NotificationSliceType, createNotificationSlice} from './notificationSlice.ts'
//...a lo que es tomar una copia de todos los argumentos, todas las funciones de set,get,etc.

export const useAppStore = create<RecipesSliceType & FavoriteSliceType & NotificationSliceType>()(devtools ((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a)
})))
