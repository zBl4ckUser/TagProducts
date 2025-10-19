import { Box, Button, Container, Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { Home, SentimentVeryDissatisfied } from "@mui/icons-material";

export default function NotFoundPage() {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '80vh',
                    textAlign: 'center',
                }}
            >
                <Paper
                    elevation={6}
                    sx={{
                        p: 6,
                        borderRadius: 4,
                        background: 'linear-gradient(135deg, #667eea22 0%, #764ba222 100%)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <SentimentVeryDissatisfied 
                        sx={{ 
                            fontSize: 120, 
                            color: '#667eea',
                            mb: 2,
                            animation: 'float 3s ease-in-out infinite',
                            '@keyframes float': {
                                '0%, 100%': {
                                    transform: 'translateY(0px)',
                                },
                                '50%': {
                                    transform: 'translateY(-20px)',
                                },
                            },
                        }} 
                    />
                    
                    <Typography 
                        variant="h1" 
                        component="h1" 
                        gutterBottom
                        sx={{
                            fontWeight: 800,
                            fontSize: { xs: '3rem', md: '5rem' },
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 2,
                        }}
                    >
                        404
                    </Typography>
                    
                    <Typography 
                        variant="h4" 
                        component="h2" 
                        gutterBottom
                        sx={{
                            fontWeight: 600,
                            color: '#2c3e50',
                            mb: 2,
                        }}
                    >
                        Oooops. Essa página não existe.
                    </Typography>
                    
                    <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{ mb: 4, maxWidth: 500 }}
                    >
                        A página que você está procurando pode ter sido removida, teve seu nome alterado ou está temporariamente indisponível.
                    </Typography>
                    
                    <Button
                        component={Link}
                        to="/produtos/exibir"
                        variant="contained"
                        size="large"
                        startIcon={<Home />}
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 3,
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5568d3 0%, #6a3e8e 100%)',
                                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Voltar para Produtos
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
}