import {useAppStore} from "../stores/useAppStorre.ts";
import DrinkCard from "../components/DrinkCard.tsx";
import { useMemo } from "react";

export default function FavoritesPage() {

    const favorites = useAppStore(state => state.favorites)
    const hasFavorite = useMemo( () => favorites.length, [favorites])
    console.log(hasFavorite)

    return(
        <>
            <h1 className="text-6xl font-extrabold">Favoritos</h1>

            {hasFavorite ? (
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
                    {favorites.map((recipe) => (
                        <DrinkCard
                            key={recipe.idDrink}
                            drink={recipe}
                        />
                    ))}
                </div>
            ): (
                <p className="my-10 text-center text-2xl">
                    Los favoritos se mostrarán aquí
                </p>
            )}
            </>
            )
            }
