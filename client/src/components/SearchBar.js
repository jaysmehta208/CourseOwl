import { useEffect, useState } from "react";

import Box from '@mui/material/Box';
import "./SearchBar.css";


import  { SwiperComponent } from "./Swiper/Swiper";
import { CourseCard } from "./CourseCard";

// Initialize Swiper modules
// SwiperCore.use([Navigation, Pagination, Grid]);

async function fetchCourses(searchTerm) {
    try {
        const res = await fetch(`http://localhost:5001/course?name=${searchTerm}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error fetching courses: ", error);
    }
}

export function SearchBar({toggleState}) {
    const [courseResults, setCourseResults] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm); // Update debounced search term
        }, 300);  // Delay search by 300ms

        return () => {
            clearTimeout(handler);  // Cleanup the timeout if input changes
        };
    }, [searchTerm]);

    // Fetch courses based on debounced search term
    useEffect(() => {
        const searchCourses = async () => {
            toggleState();
            if (debouncedTerm && debouncedTerm.trim() !== "") {
                const results = await fetchCourses(debouncedTerm);
                if (results) {
                    setCourseResults(results);
                } else {
                    setCourseResults([]);
                }
            } else {
                setCourseResults([]);
            }
        };

        searchCourses();
    }, [debouncedTerm]);


    return (
        <>
            <h1>calendar page test</h1>
            <Box className="input-wrapper" sx={{ mb: 3 }}>
                <input
                    placeholder="Type to search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Box>
                <div >
                    {courseResults && courseResults.length > 0 ? (

                       <SwiperComponent 
                       slides={courseResults.map((course)=> 
                        ( 
                            //Children 
                        <CourseCard course={course}> </CourseCard>
                            //Children 

                        )
                        
                        
                        )}>
                        
                       
                       </SwiperComponent>

                    ) : (
                        <p>No courses found</p>
                    )}
                </div>
        </>
    );
}