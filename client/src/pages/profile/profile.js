import React from 'react';
import { Box, Typography, Button } from "@mui/material";
import UserCard from "./components/userCard";
import "./styles.css";

export default function ProfilePage() {
    return (
        <div className="App">
            <div className="container">

                <UserCard />

            </div>
        </div>
    )
}