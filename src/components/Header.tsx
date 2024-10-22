import {useEffect, useMemo, useState, ChangeEvent, FormEvent} from 'react';
import {NavLink, useLocation} from "react-router-dom";
//Link --> Se enlaza a la paginas con Link para mejorar el performance de nuestra página
//NavLink --> Igual que link pero trae un prop que recibe un callback que permite dar estilos si la persona se encuentra en esa página
import {useAppStore} from "../stores/useAppStorre.ts";



export default function Header() {

    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    });
    const {pathname} = useLocation();
    const isHome = useMemo( () => pathname === '/', [pathname]);

    const fetchCategories = useAppStore( state => state.fetchCategories);
    const categories = useAppStore( state => state.categories);
    const searchRecipies = useAppStore( state => state.searchRecipies);
    //Notification
    const showNotification = useAppStore(state => state.showNotification)



    useEffect( () => {
        fetchCategories()
    },[])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
            setSearchFilters({
                ...searchFilters,
                [e.target.name]: e.target.value
            })
    }

    const handleSubmit = ( e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //TODO: Validar
        if (Object.values(searchFilters).includes('')) {
        return showNotification({
            text: 'Todos los campos son obligatorios!',
            error: true
        })
        }
        //Consular las recetas
        searchRecipies(searchFilters)
    }

    return (
        <header className={/*Uso de useLocation()*/ isHome ? "bg-header bg-center bg-cover" : "bg-slate-950"}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="./logo.svg" alt="logo"/>
                    </div>
                    <nav className="flex gap-4">
                        <NavLink
                            className={({isActive}) => isActive ? 'text-purple-500 uppercase font-bold' : 'text-white uppercase font-bold'}
                            to="/"
                        >
                            Inicio
                        </NavLink>
                        <NavLink
                            className={({isActive}) => isActive ? 'text-purple-500 uppercase font-bold' : 'text-white uppercase font-bold'}
                            to="/favoritos"
                        >
                            Favoritos
                        </NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form className="md:w-1/2 2xl:w-1/3 bg-purple-700 my-32 p-10 rounded-xl shadow space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-4">
                            <label
                                htmlFor="ingredient"
                                className="block text-white uppercase font-extrabold text-lg"
                            >
                                Nombres o Ingredientes
                            </label>
                            <input
                                id="ingredient"
                                type="text"
                                name="ingredient"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                placeholder="Nombre o ingrediente. Ej. Vodka, Tequila, Café"
                                onChange={handleChange}
                            />

                        </div>
                        <div className="space-y-4">
                            <label
                                htmlFor="category"
                                className="block text-white uppercase font-extrabold text-lg"
                            >
                                Categoria
                            </label>
                            <select
                                id="category"
                                name="category"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                onChange={handleChange}
                                value={searchFilters.category}
                            >
                                <option value=""> -- Seleccione --</option>
                                { categories.drinks.map( category => (
                                    <option key={category.strCategory} value={category.strCategory}> {category.strCategory} </option>
                                )) }
                            </select>
                        </div>
                        <input type="submit"
                        className=" cursor-pointer bg-purple-900 hover:bg-purple-950 text-white font-extrabold w-full p-2 rounded-lg uppercase "
                       value="Buscar Recetas"
                        />
                    </form>
                )}

            </div>

        </header>
    );
}
