import React, { useState, useEffect } from 'react'
import { useAuth } from "../../../../hooks/useAuth";


import {
    Container,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel,
    Typography,
    Card,
    Box,
    CardMedia,
    CardActionArea,
} from "@mui/material";
import Grid from '@mui/material/Grid2'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { database, account } from "../../../../appwriteConf/appwriteConfig";
import { useMutation } from 'react-query';
import { postAdoption } from '../../../../services/queryFunctions';
const Adopt = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    console.log("pet id", id)
    const { data: user } = useAuth()
    // const user = await account.get(); // Get logged-in user
   const userId = user?.$id;
    const [errors, setErrors] = useState()
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        address: "",
        petid: "",
        desc: "",
        agree: false,
        status: "",
        userid: ""
    });



    useEffect(() => {
        
        setFormData((prevData) => ({
          ...prevData,
          email: user?.email || "",  
          petid: id || "",
          status:"pending" ,
          userid: userId    
        }));
      }, [user?.email,id,userId]);  


    // useEffect(() => {
    //     let userId = ""
    //     const fetchData = async () => {
    //         // Appwrite User ID
    //     };

    //     fetchData();

    //     return () => {
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             email: user?.email || "",
    //             petid: id || "",
    //             status: "pending",
    //             userid: userId
    //         }));
    //     };
    // }, [user?.email, id]);




    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
            email: prevData.email,  // 🔒 Preserve userEmail
            petid: prevData.petid,
            status: prevData.status,
            userid: prevData.userid
        }));
    };
    const { mutate, isLoading, isError, onSuccess } = useMutation(postAdoption, {
        onSuccess: (data) => {
            alert("Reques submitted")
            navigate("/")
            console.log("mutation success", data)
        },
        onError: (error) => {
            console.log("mutation error", error)
        }
    })


    // Form validation
    const validateForm = () => {
        let newErrors = {};
        if (!formData.fullname) newErrors.fullname = "Full Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.phone.match(/^[0-9]{10}$/)) newErrors.phone = "Phone number must be 10 digits";
        if (!formData.address) newErrors.address = "Address is required";
        if (formData.message?.length < 10) newErrors.message = "Message should be at least 10 characters";
        if (!formData.agree) newErrors.agree = "You must agree to the terms";

        setErrors(newErrors);
        return Object.keys(newErrors)?.length === 0;
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitting Form Data:", formData);
        if (!validateForm()) return;

        mutate(formData)

    };



    if (!user) {
        return (
            <p>Please Login First</p>

        )
    }



    return (
        <div>
            <Container maxWidth="md" style={{ marginTop: "30px", marginBottom: "30px" }}>
                <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        🐾 Pet Adoption Form 🏡
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom padding={1} marginBottom={2}>
                        Choose your furry friend and complete the adoption process!
                    </Typography>

                    <form onSubmit={handleSubmit} id="adoptForm">

                        {/* Full Name */}

                        <TextField
                            fullWidth
                            label="Full Name"
                            name="fullname"
                            variant="outlined"
                            margin="normal"
                            value={formData?.fullname}
                            onChange={handleChange}
                            error={!!errors?.fullname}
                            helperText={errors?.fullname}
                        />


                        {/* Email */}

                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            variant="outlined"
                            margin="normal"
                            value={user?.email}
                        // onChange={handleChange}
                        // error={!!errors.email}
                        // helperText={errors.email}
                        />


                        {/* Phone */}

                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            variant="outlined"
                            margin="normal"
                            value={formData.phone}
                            onChange={handleChange}
                            error={!!errors?.phone}
                            helperText={errors?.phone}
                        />

                        {/* Address */}

                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            multiline
                            variant="outlined"
                            margin="normal"
                            rows={2}
                            value={formData.address}
                            onChange={handleChange}
                            error={!!errors?.address}
                            helperText={errors?.address}
                        />
                        {/* pet id */}
                        <TextField
                            fullWidth
                            label="Pet Id"
                            name="petid"
                            variant="outlined"
                            value={id}
                        // onChange={handleChange}
                        // error={!!errors.address}
                        // helperText={errors.address}
                        />

                        {/* Message */}

                        <TextField
                            fullWidth
                            label="Why do you want to adopt?"
                            name="desc"
                            multiline
                            rows={3}
                            variant="outlined"
                            margin="normal"
                            value={formData.message}
                            onChange={handleChange}
                            error={!!errors?.message}
                            helperText={errors?.message}
                        />

                        {/* status */}
                        <TextField
                            fullWidth
                            type="hidden"
                            name="status"

                            value="pending"
                        // onChange={handleChange}
                        // error={!!errors.address}
                        // helperText={errors.address}
                        />
                        <TextField
                            fullWidth
                            type="hidden"
                            name="userid"

                            value={userId}
                        // onChange={handleChange}
                        // error={!!errors.address}
                        // helperText={errors.address}
                        />
                        {/* Agree to Terms */}

                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="agree"
                                    checked={formData.agree}
                                    onChange={handleChange}
                                    color="primary"
                                />
                            }
                            label="I agree to the adoption terms and conditions."
                        />
                        {errors?.agree && (
                            <Typography color="error" variant="caption">
                                {errors?.agree}
                            </Typography>
                        )}


                        {/* Submit Button */}
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" fullWidth sx={{ borderRadius: "30px", backgroundColor: "#000033" }} >
                                Submit Adoption Form
                            </Button>
                        </Grid>

                    </form>
                </Box>
            </Container>
        </div>
    )
}

export default Adopt