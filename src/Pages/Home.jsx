import React, { useRef } from "react";

import {
    Container,
    Typography,
    Button,
    Box,
    Grid
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Header from "../Components/Header";
import TemplateCard from "../Components/TemplateCard";

import templates from "../Data/Data";

function Home() {
    const templatesRef = useRef(null);

    return (
        <>
            <Header />

            {/* Hero Section */}
            <Box
                sx={{
                    background: "linear-gradient(135deg, #eff6ff, #ffffff)",
                    py: 9,
                    textAlign: "center"
                }}
            >
                <Container maxWidth="md">

                    <Typography
                        component="h1"
                        id="hero-heading"
                        variant="h2"
                        fontWeight="bold"
                        sx={{
                            fontSize: { xs: "35px", md: "52px" },
                            color: "#172554"
                        }}
                    >
                        Build Your Perfect Resume
                    </Typography>

                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{
                            mt: 3,
                            mb: 4,
                            fontWeight: 400,
                            lineHeight: 1.8
                        }}
                    >
                        Create a professional resume in minutes.
                        Choose from our beautiful templates and
                        make your dream job a reality.
                    </Typography>

                    <Button
                        variant="contained"
                        aria-controls="templates"
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        onClick={() =>
                            templatesRef.current?.scrollIntoView({ behavior: "smooth" })
                        }
                        sx={{
                            backgroundColor: "#2563eb",
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: "none",
                            fontSize: 16,
                            "&:hover": {
                                backgroundColor: "#1d4ed8"
                            }
                        }}
                    >
                        Explore Templates
                    </Button>

                </Container>
            </Box>

            {/* Templates Section */}
            <Container
                ref = {templatesRef}
                id="templates"
                aria-labelledby="template-heading"
                maxWidth="lg"
                sx={{ py: 8 }}
            >

                <Box sx={{ textAlign: "center", mb: 5 }}>
                    <Typography
                        variant="h4"
                        id="template-heading"
                        component="h1"
                        fontWeight="bold"
                        color="#172554"
                    >
                        Choose Your Resume Template
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mt: 2 }}
                    >
                        Select a template to start creating your resume.
                    </Typography>
                </Box>

                <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                    {templates.map((template) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={template.id}>
                            <TemplateCard template={template} />
                        </Grid>
                    ))}
                </Grid>

            </Container>

            {/* Footer */}
            <Box
                sx={{
                    backgroundColor: "#172554",
                    color: "white",
                    textAlign: "center",
                    py: 3
                }}
            >
                <Typography variant="body2">
                    © 2026 ResumeBuilder. All Rights Reserved.
                </Typography>
            </Box>
        </>
    );
}

export default Home;
