import {useMemo} from 'react'
import {useAppStore} from "../stores/useAppStorre.ts";
import DrinkCard from "../components/DrinkCard.tsx";


export default function IndexPage(){

       const drinks = useAppStore( state => state.drinks);

       const hasDrink = useMemo( () => drinks.drinks.length,[drinks])

    return(
        <>
           <h1 className="text-6xl font-extrabold">
                Recetas
           </h1>
            {hasDrink ? (
                <div    className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
                    {drinks.drinks.map((drink) => (
                        <DrinkCard
                        key={drink.idDrink}
                        drink={drink}
                        />
                    ))}

                </div>
            ):(
                <>
                    <p className="my-10 text-center text-2xl">No hay bebidas aún, usa el formulario para obtener recetas!</p>
                </>
            )}
        </>
    )
}
