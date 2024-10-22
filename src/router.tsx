import {lazy, Suspense} from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexPage from "./views/IndexPage.tsx";
import Layout from "./layouts/Layout.tsx";
// BrowserRouter --> Te permite crear el router
// Routes --> El grupo de rutas
/*Route --> Cada ruta irá en este componente
*   path --> url que la persona va a visitar
*   element --> componente que se va a cargar
*   index --> Props para indicarle que esa es la pagina principal
* */

const FavoritesPage = lazy( () => import('./views/FavoritesPage.tsx'))

export default function AppRouter() {

    return(
        <BrowserRouter>
            <Routes>
                <Route element={ <Layout/> }>
                    <Route path='/' element={ <IndexPage/> } index/>
                    <Route path='/favoritos' element={
                        <Suspense fallback="Cargando...">    
                            <FavoritesPage/>
                        </Suspense>}/>
                </Route>
        </Routes>
        </BrowserRouter>
    )
}
