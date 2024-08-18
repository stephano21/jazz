import React, { Fragment, useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Novia } from "./views/Novia";
import "./index.css";
import 'rsuite/dist/rsuite.min.css';

import { NotFoundPage } from "./views/NotFoundPage";
import { Home } from "./views/Home";
import { EmailConfirm } from "./views/EmailConfirm";

export const App: React.FC = () => {
    const { isAuthenticated, UserData } = useAuth();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);
    }, [isAuthenticated]);

    if (!isReady) {
        return null;
    }
    console.log(isAuthenticated)
    return (
        <>
            <Router>
                <Routes>
                    {isAuthenticated ? (
                        <>
                            <Route path="/" element={<Navigate to="/home" />} />
                            <Route path="/nv" element={<Novia />} />
                            
                            <Route path="*" element={<NotFoundPage />} />
                            {UserData && UserData.Role !== null && (
                                <Fragment>
                                    <Route path="/crop/readings" element={<Novia />} />
                                </Fragment>
                            )}

                        </>
                    ) : (
                        <>
                            <Route path="/" element={<Navigate to="/home" />} />
                            <Route path="/auth/login" element={<Novia />} />
                            <Route path="/home" element={<Home />} />
                        </>
                    )}
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/email/confirm" element={<EmailConfirm />} />
                </Routes>
            </Router>
        </>
    );
};
