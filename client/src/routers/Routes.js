// routes/Rout.js
import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ProfessorDetails from '../components/ProfessorDetails';
import CourseDetails from '../components/CourseDetails';
import AccountDetails from '../components/AccountDetails'; // Import AccountDetails
import Forums from '../pages/Forums'; 
import Courses from '../pages/Courses'; 
import NotFound from "../pages/NotFound"; 
import { ProtectedRoute } from "./ProtectedRoute";

import VerificationSuccessPage from "../pages/VerificationSuccessPage";
import ResetPassword from "../pages/ResetPassword";
import ForumDetails from "../components/Forum/ForumDetails";
import AlertsPage from "../pages/AlertsPage";

import Marketplace from "../pages/Marketplace";
import MarketplaceItemDetails from "../components/MarketplaceItemDetails";
import CreateListing from "../components/CreateListing";

export function Rout({ setIsLoggedIn, isLoggedIn }) {
    return (
        <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
            <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />

            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/professor/:alias" element={<ProfessorDetails />} />
            <Route path="/course/:course_code" element={<CourseDetails />} />

            <Route path="/user/verify/:token" element={<VerificationSuccessPage />} />
            <Route path="?user/reset-password/:token" element={<ResetPassword />} />
            {/* Add route for AccountDetails */}
            <Route 
                path="/account" 
                element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <AccountDetails />  {/* The AccountDetails component */}
                    </ProtectedRoute>
                } 
            />
            {/* change to use forum code later */}
            <Route path="/forum/:forumId" element={ <ForumDetails />} /> 


            <Route 
                path="/alerts" 
                element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <AlertsPage />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/forums" 
                element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Forums />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/courses" 
                element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Courses />
                    </ProtectedRoute>
                } 
            />

            <Route 
                path="/marketplace" 
                element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Marketplace />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/marketplace/create" 
                element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <CreateListing />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/marketplace/item/:id" 
                element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <MarketplaceItemDetails />
                    </ProtectedRoute>
                } 
            />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
