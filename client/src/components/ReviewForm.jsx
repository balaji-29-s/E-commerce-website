import { Box, Button, TextField } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
const ReviewForm = (props) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        props.createReview(rating, review);
        setRating(0);
        setReview("");
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, mt: '1rem' }}>
            <Rating
                name="user-rating"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
            />
            <TextField
                label="Your Review"
                multiline
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
            />
            <Button type="submit" variant="contained">Submit</Button>
        </Box>
    )
}

export default ReviewForm;