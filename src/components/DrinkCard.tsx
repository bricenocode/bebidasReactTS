import {Drink} from "../types";
import {useAppStore} from "../stores/useAppStorre.ts";

type DrinkCardProps = {
    drink: Drink
}

export default function DrinkCard({drink}: DrinkCardProps) {

    const selectRecipe = useAppStore(state =>  state.selectRecipe)

    return(

        <div    className="border shadow-lg">
            <div className="overflow-hidden">
                <img
                    src={drink.strDrinkThumb}
                    alt={`Imagen de ${drink.strDrink}`}
                    className="hover:scale-110 transition-transform hover:rotate-2"
                />
            </div>
            <div className="p-5">
                <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
                <button
                type="button"
                className="bg-purple-900 hover:bg-purple-950 mt-5 w-full p-3 font-bold text-white text-lg"
                onClick={() => selectRecipe(drink.idDrink)}
                >
                    Ver Receta
                </button>
            </div>


        </div>
    )
}
