import { Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { useEffect, useState } from "react";
import Menu from "../components/dashbord/Menu";
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import Header from "../components/dashbord/Header.jsx";
import Footer  from "../components/dashbord/Footer.jsx";


export default function DefaultLayout() {
    const {  notification } = useStateContext();
    const [connection, setConnection] = useState(navigator.onLine);

    // connection fucntion
    function handleOffline() {
        setConnection(false);
    }

    function handleOnline() {
        setConnection(true);
    }

    console.log(connection);
    useEffect(() => {
        window.addEventListener("offline", handleOffline);
        window.addEventListener("online", handleOnline);
    }, [connection]);

    if (!connection) {
        return <h1>no internet</h1>;
    }
    // end connection

    // eslint-disable-next-line react-hooks/rules-of-hooks

    return (
        <div id="defaultLayout">

            <div className="aside" >
                <Menu />
            </div>

            <div className="header">
                <Header/>
            </div>

            <div className="content">

                <main>
                    <Outlet />
                </main>

                {notification && (
                    <Toast className="notification">
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                            <HiCheck className="h-5 w-5" />
                        </div>
                        <div className="ml-3  text-sm font-normal">
                            {notification}
                        </div>
                        <Toast.Toggle />
                    </Toast>
                )}
            </div>

            <div className="footer">
                <Footer/>
            </div>
        </div>
    );
}
