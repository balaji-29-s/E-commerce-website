import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Review from '../components/Review';
import ReviewForm from '../components/ReviewForm';

const ShowProduct=()=>{
    const {productId}=useParams();
    const [product,setProduct]=useState(null);

    async function fetchProduct(){
        const response = axios.get(`http://localhost:1234/products/${productId}`)
        .then((res)=>{
            setProduct(res.data);
        })
        .catch((err)=>{
            console.error('Error fetching product:', err);
        });
    }
    useEffect(()=>{
        fetchProduct();
    },[]);
    const createReview=async(rating,review)=>{
        axios.post(`http://localhost:1234/products/${productId}/reviews`, { rating, review })
        .then((res)=>{
            fetchProduct();
        })
        .catch((err)=>{
            console.error('Error creating review:', err);
        });
    }
return(
    <Fragment>
            {!product && <p>Loading Product Details</p>}
            {product && <Box sx={{ mt: 15, maxWidth: '80%', mx: 'auto' }}>
                <Grid container spacing={10}>
                    <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 200 }}
                                image={product.image}
                                title={product.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.title}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    $ {product.price}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {product.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" variant="contained" component={Link} to={`/products/${productId}`}>Add to Cart</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
                        <Typography variant="h5">Add a review</Typography>
                        <ReviewForm createReview={createReview} />
                        {
                            product.reviews?.map((item) => {
                                return <Review key={item._id} rating={item.rating} review={item.review} />
                            })
                        }
                    </Grid>
                </Grid>
            </Box >}
        </Fragment>
)
}
export default ShowProduct;