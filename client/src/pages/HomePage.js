import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, Box } from "@mui/material";
import axios from "axios";
import { SearchBar } from "../components/SearchBar.js"
import { CalendarView } from "../components/ScheduleCal";
import config from '../config';
import { TableView } from "../components/TableView.js"
import { CalendarView } from "../components/CalendarView.js"

function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(location.state?.user);
    const [loading, setLoading] = useState(!user);
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    useEffect(() => {
        if (!user) {
            axios.get(`${config.API_BASE_URL}/user/`, { withCredentials: true })
                .then(response => {
                    if (response.data.user) {
                        setUser(response.data.user);
                    } else {
                        navigate("/login");
                    }
                })
                .catch(() => navigate("/login"))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [user, navigate]);

    if (loading) {
        return <center><h1>Loading...</h1></center>;
    }

    return (
        <><SearchBar />
            <Box sx={{ width: '100%' }}>
                {/* Tabs for selecting different components */}
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    sx={{
                        '& .MuiTabs-indicator': {
                          backgroundColor: '#daaa00',  // Set indicator color
                        },
                        '& .MuiTab-root': {
                          color: '#000',  // Default color for tabs
                          '&.Mui-selected': {
                            color: '#daaa00',  // Selected tab color
                          },
                        },
                      }}
                >
                    <Tab label="Calendar View" />
                    <Tab label="Table View" />
                </Tabs>

                {/* Render the selected component based on the selected tab */}
                <Box sx={{ padding: 3 }}>
                    {selectedTab === 0 && <CalendarView />}
                    {selectedTab === 1 && <TableView />}
                </Box>
            </Box>
        {/* <center>
            <h1 style={{ color: "white", fontSize: "5rem" }}>Welcome Home {user && user.name} !!!</h1>
        </center> */}
        <CalendarView user={user}/>
        </>
    );
}

export default Home;
