import { Card, CardContent, CardActionArea, IconButton } from '@mui/material';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import config from '../../config';
import axios from "axios";

const generateRandomColor = () => {
    const colors = ['#561d25', '#ce8147', '#ecdd7b', '#d3e298', '#cde7be'];
    return colors[Math.floor(Math.random() * colors.length)];
};


export function ForumCard({ user, forum , joined, onChange}) {

    const joinLeaveForum = async (event) => {
        event.preventDefault();
        console.log("Join/Leave forum clicked");
        const userId = user.id;
        const forumId = forum._id;
    
        try {
            await axios.post(`${config.API_BASE_URL}/forum/joinLeaveForum?userId=${userId}&forumId=${forumId}`);
            joined = !joined;
            onChange(!onChange);
        } catch (error) {
            console.log("Error joining/leaving forum: ", error);
        }
    }

    const randomColor = generateRandomColor();
    return (
        <div style={{ cursor: 'pointer', flexDirection: 'row', transition: 'transform .1s ease-in-out, box-shadow .1s ease-in-out', display : "flex", position: "relative" }}>
            <div style={{
                position: "absolute",
                left: "0px",
                bottom: "0",
                backgroundColor: randomColor,
                width: '10px', 
                zIndex: 999 ,
                height: "100%"
            }} />
            <Card style={{width: "100%"}} sx={{ position: 'relative' }}>
                <CardActionArea component={Link} to={`/forum/${forum._id}`}>
                    <IconButton 
                        onClick={(event) => joinLeaveForum(event)}
                        sx={{position: 'absolute',right: 12,}}
                    >
                        {joined ? <Bookmark /> : <BookmarkBorder />}
                    </IconButton>
                
                    <CardContent>
                        <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 18, mb: 1, textAlign: "center" }}>
                            {forum.course_code && forum.name
                                ? `${forum.course_code} || ${forum.name.toLowerCase()
                                    .split(' ') 
                                    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                                    .join(' ')}`
                                : forum.course_code
                                    ? forum.course_code 
                                    : forum.name.toLowerCase()
                                    .split(' ') 
                                    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                                    .join(' ')}
                        </Typography>
                        <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 14, mb: 5, textAlign: "center" }}>
                        {forum.course_name ? forum.course_name.split(' - ')[0] : ''}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}