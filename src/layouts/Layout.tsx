import {useEffect} from "react";

import {useAppStore} from "../stores/useAppStorre.ts";
import Header from "../components/Header.tsx";
import {Outlet} from "react-router-dom";
import Modal from "../components/Modal.tsx";
import Notification from "../components/Notification.tsx";

export default function Layout() {

    const loadFromStorage = useAppStore(state => state.loadFromStorage);

    useEffect(() => {
        loadFromStorage();
    },[])

    return(
        <>
            <Header/>

            <main className="container mx-auto py-16">
                <Outlet/>
            </main>

            <Modal/>
            <Notification/>
        </>
    )
}
