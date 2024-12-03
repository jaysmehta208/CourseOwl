import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText, Card, CardContent, Divider } from '@mui/material';
import axios from 'axios';
import config from '../config';
import { InputAdornment } from '@mui/material';
import { Dialog, DialogContent } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

const CreateListing = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null); // Add this state
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        sellerName: '',
        sellerEmail: '',
        sellerContact: '',
        purchaseMode: [], // Multi-selection for mode of purchase
        paymentMethods: [], // Multi-selection for payment methods
        images: [],
    });

    const purchaseModes = ['Shipping', 'In-person']; // Mode of purchase options
    const paymentOptions = ['Cash', 'Card', 'Venmo', 'Zelle']; // Payment method options

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const handleMultiSelectChange = (name) => (event) => {
        const { value } = event.target;
        setFormData({ ...formData, [name]: typeof value === 'string' ? value.split(',') : value });
    };
    const validateFields = () => {
        const fieldErrors = {};
        if (!formData.title.trim()) fieldErrors.title = 'Required field';
        if (!formData.price.trim()) fieldErrors.price = 'Required field';
        if (!formData.sellerName.trim()) fieldErrors.sellerName = 'Required field';
        if (!formData.sellerEmail.trim()) fieldErrors.sellerEmail = 'Required field';
        if (!formData.sellerContact.trim()) fieldErrors.sellerContact = 'Required field';
        return fieldErrors;
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        const base64Images = await Promise.all(
            files.map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result); // Base64 encoded string
                    reader.onerror = (error) => reject(error);
                });
            })
        );
    
        setFormData((prevFormData) => ({
            ...prevFormData,
            images: [...prevFormData.images, ...base64Images],
        }));
    };

    
    const handleSubmit = async () => {
        const fieldErrors = validateFields();
        if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors);
            return; // Prevent submission
        }
        try {
            console.log(formData)
            await axios.post(`${config.API_BASE_URL}/api/marketplace`, formData);
            alert('Listing created successfully');
            navigate('/marketplace');
        } catch (error) {
            console.error('Error creating listing:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: '800px', margin: 'auto', mt: 5, borderRadius: '10px', p: 3 }}>
            <Card sx={{ backgroundColor: '#f4f4f9', boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#2E3B55' }}>
                        Create a Listing
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2, 
                        }}
                    >
                    {/* Title */}
                    <TextField
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.title} // Highlight field in red if error exists
                        helperText={errors.title} // Display error message
                        sx={{
                            mb: 3,
                            '& .MuiInputLabel-root': { color: '#2E3B55' }, // Label color
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#2E3B55', // Border color
                                },
                                '&:hover fieldset': {
                                    borderColor: '#2E3B55', // Hover border color
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#2E3B55', // Focused border color
                                },
                            },
                        }}
                    />
                     {/* Price */}
                     <TextField
                        label="Price"
                        name="price"
                        type="number"
                        value={formData.price}
                        // onChange={(e) => {
                        //     const value = e.target.value; // Directly use the value entered
                        //     setFormData({ ...formData, price: value }); // Store the value in the state
                        // }}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            inputProps: { step: 0.01 },
                        }}
                        fullWidth
                        error={!!errors.price}
                        helperText={errors.price}
                        sx={{
                            mb: 3,
                            '& .MuiInputLabel-root': { color: '#2E3B55' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#2E3B55' },
                                '&:hover fieldset': { borderColor: '#2E3B55' },
                                '&.Mui-focused fieldset': { borderColor: '#2E3B55' },
                            },
                        }}
                    />
                    </Box>
                    {/* Description */}
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        sx={{
                            mb: 3,
                            '& .MuiInputLabel-root': { color: '#2E3B55' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#2E3B55' },
                                '&:hover fieldset': { borderColor: '#2E3B55' },
                                '&.Mui-focused fieldset': { borderColor: '#2E3B55' },
                            },
                        }}
                    />

                   

                    {/* Seller Name */}
                    <TextField
                        label="Seller Name"
                        name="sellerName"
                        value={formData.sellerName}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.sellerName}
                        helperText={errors.sellerName}
                        sx={{
                            mb: 3,
                            '& .MuiInputLabel-root': { color: '#2E3B55' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#2E3B55' },
                                '&:hover fieldset': { borderColor: '#2E3B55' },
                                '&.Mui-focused fieldset': { borderColor: '#2E3B55' },
                            },
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2, // Adjust the space between the two fields
                        }}
                    >
                    {/* Seller Email */}
                    <TextField
                        label="Seller Email"
                        name="sellerEmail"
                        value={formData.sellerEmail}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.sellerEmail}
                        helperText={errors.sellerEmail}
                        sx={{
                            mb: 3,
                            '& .MuiInputLabel-root': { color: '#2E3B55' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#2E3B55' },
                                '&:hover fieldset': { borderColor: '#2E3B55' },
                                '&.Mui-focused fieldset': { borderColor: '#2E3B55' },
                            },
                        }}
                    />
                    {/* Seller Contact */}
                    <TextField
                        label="Seller Contact No."
                        name="sellerContact"
                        type="number"
                        value={formData.sellerContact}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.sellerContact}
                        helperText={errors.sellerContact}
                        sx={{
                            mb: 3,
                            '& .MuiInputLabel-root': { color: '#2E3B55' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#2E3B55' },
                                '&:hover fieldset': { borderColor: '#2E3B55' },
                                '&.Mui-focused fieldset': { borderColor: '#2E3B55' },
                            },
                        }}
                    />
                    </Box>

                    {/* Mode of Purchase and Payment Methods */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2, // Adjust the space between the two fields
                            mb: 3,
                        }}
                    >
                        {/* Mode of Purchase */}
                        <FormControl
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#2E3B55', // Default border color
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#2E3B55', // Hover state border color
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#2E3B55', // Focused state border color
                                    },
                                },
                                '& .MuiInputLabel-root': { color: '#2E3B55' },
                            }}
                        >
                            <InputLabel
                                id="purchase-mode-label"
                                shrink={formData.purchaseMode.length > 0 || false} // Shrink only when there's a value
                                sx={{
                                    color: '#2E3B55',
                                    background: '#f4f4f9', // Matches the background of the form
                                    px: 1, // Padding around the text
                                    transform: formData.purchaseMode.length
                                        ? 'translate(14px, -7px) scale(.75)' // Move above if filled
                                        : 'translate(14px, 16px) scale(1)', // Default inside box
                                    transition: 'all 0.2s ease-out', // Smooth transition
                                }}
                            >
                                Mode of Purchase
                            </InputLabel>
                            <Select
                                labelId="purchase-mode-label"
                                multiple
                                value={formData.purchaseMode}
                                onChange={handleMultiSelectChange('purchaseMode')}
                                renderValue={(selected) => selected.join(', ')}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#2E3B55', // Default border color
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#2E3B55', // Hover state border color
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#2E3B55', // Focused state border color
                                    },
                                }}
                            >
                                {purchaseModes.map((mode) => (
                                    <MenuItem key={mode} value={mode}>
                                        <Checkbox checked={formData.purchaseMode.includes(mode)} />
                                        <ListItemText primary={mode} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>




                        {/* Payment Methods */}
                        <FormControl
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#2E3B55', // Default border color
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#2E3B55', // Hover state border color
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#2E3B55', // Focused state border color
                                    },
                                },
                                '& .MuiInputLabel-root': { color: '#2E3B55' },
                            }}
                        >
                            <InputLabel
                                id="payment-methods-label"
                                shrink={formData.paymentMethods.length > 0 || false} // Shrink only when there's a value
                                sx={{
                                    color: '#2E3B55',
                                    background: '#f4f4f9', // Matches the background of the form
                                    px: 1, // Padding around the text
                                    transform: formData.paymentMethods.length
                                        ? 'translate(14px, -7px) scale(.75)' // Move above if filled
                                        : 'translate(14px, 16px) scale(1)', // Default inside box
                                    transition: 'all 0.2s ease-out', // Smooth transition
                                }}
                            >
                                Payment Methods
                            </InputLabel>
                            <Select
                                labelId="payment-methods-label"
                                multiple
                                value={formData.paymentMethods}
                                onChange={handleMultiSelectChange('paymentMethods')}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            bgcolor: '#f4f4f9', // Dropdown background color
                                            color: '#2E3B55', // Dropdown text color
                                        },
                                    },
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#2E3B55', // Default border color
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#2E3B55', // Hover state border color
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#2E3B55', // Focused state border color
                                    },
                                }}
                            >
                                {paymentOptions.map((method) => (
                                    <MenuItem key={method} value={method}>
                                        <Checkbox checked={formData.paymentMethods.includes(method)} />
                                        <ListItemText primary={method} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Box>



                    {/* Image Upload */}
                    <Box sx={{ mb: 3 }}>
                    <Button variant="contained" component="label">
                        Upload Images
                        <input type="file" multiple hidden onChange={handleImageUpload} />
                    </Button>

                        {/* <Button variant="contained" component="label">
                            Upload Images
                            <input
                                type="file"
                                multiple
                                hidden
                                onChange={(e) => {
                                    const files = Array.from(e.target.files); // Convert FileList to Array
                                    const imageUrls = files.map((file) => URL.createObjectURL(file));
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        images: [...prevFormData.images, ...imageUrls], // Append new images to existing ones
                                    }));
                                }}
                            />
                        </Button> */}

                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                            {formData.images.map((image, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        position: 'relative',
                                        width: '100px',
                                        height: '100px',
                                        cursor: 'pointer', // Indicates clickability
                                    }}
                                    onClick={() => setSelectedImage(image)} // Open modal on click
                                >
                                    <img
                                        src={image}
                                        alt={`Preview ${index + 1}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                                        }}
                                    />
                                    <Button
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            minWidth: '24px',
                                            width: '24px',
                                            height: '24px',
                                            padding: 0,
                                            borderRadius: '50%',
                                            backgroundColor: 'rgba(0,0,0,0.6)',
                                            color: 'white',
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0,0,0,0.8)',
                                            },
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering modal on delete
                                            setFormData((prevFormData) => ({
                                                ...prevFormData,
                                                images: prevFormData.images.filter((_, i) => i !== index), // Remove image by index
                                            }));
                                        }}
                                    >
                                        ✕
                                    </Button>
                                </Box>
                            ))}
                        </Box>

                        <Dialog
                            open={!!selectedImage} // Open when an image is selected
                            onClose={() => setSelectedImage(null)} // Close the dialog
                            maxWidth="lg" // Set dialog size
                        >
                            <DialogContent
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#000', // Dark background for better visibility
                                    padding: 2,
                                }}
                            >
                                <img
                                    src={selectedImage}
                                    alt="Expanded Preview"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '80vh',
                                        objectFit: 'contain', // Maintain aspect ratio
                                        borderRadius: '8px',
                                    }}
                                />
                            </DialogContent>
                        </Dialog>
                    </Box>


                    {/* Submit Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSubmit}
                        sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
                    >
                        Submit Listing
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default CreateListing;
