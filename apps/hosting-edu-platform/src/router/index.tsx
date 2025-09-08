import {Route, Routes} from "react-router";
import * as A from "../pages";

export function Router() {
    return (
        <Routes>
            <Route path="/register" element={<A.Register />} />
            <Route path="/login" element={<A.Login />} />
            <Route path="/home" element={<A.Home />} />
        </Routes>
    )
}