import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import Calendar from "../pages/Calendar";

export function Rout(){
    return (
        <Routes>
          <Route path="/calendar" element={<Calendar />} />
          <Route path="" element={<HomePage />} />
        </Routes>
      );
}