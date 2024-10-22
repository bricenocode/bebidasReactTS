import { StateCreator} from 'zustand'
import {Recipe} from "../types";

//Aninando Slices,Nestes Slices
import {createRecipesSlice, RecipesSliceType} from './recipeSlice'
import { createNotificationSlice, NotificationSliceType } from './notificationSlice';

export type FavoriteSliceType = {
    favorites: Recipe[],
    handleClickFavorite: (recipe: Recipe) => void,
    favoriteExists: (id: Recipe['idDrink']) => boolean,
    loadFromStorage(): void


}
export const createFavoriteSlice: StateCreator<FavoriteSliceType/*Esta es la forma para tipar con el anidado de slices*/ & RecipesSliceType & NotificationSliceType , [], [], FavoriteSliceType> = (set,get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if(get().favorites.some(favorite => favorite.idDrink === recipe.idDrink)) {
            //Esta logica me dice que si existe, lo elimina del arreglo
            set( (state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink),
            }))
            createNotificationSlice(set, get, api).showNotification({ 
                text: 'Se eliminó de favoritos!', 
                error: false
            })
        }else{
            //Esta logica me dice que si NO existe, lo agrega al arreglo
            set((state) => ({
                favorites: [...state.favorites, recipe],
            }))
            createNotificationSlice(set, get, api).showNotification({ 
                text: 'Se agregó a favoritos!', 
                error: false
            })
        }
        //Aninando Slices
        createRecipesSlice(set, get, api).closeModal()
        localStorage.setItem('favorites', JSON.stringify(get().favorites));
    },
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})

//Slice Pattern
