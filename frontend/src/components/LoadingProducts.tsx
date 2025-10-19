import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingProducts(){
    return (
        <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '70vh',
                    gap: 2
                }}
            >
                <CircularProgress size={60} thickness={4} />
                <Typography variant="h6" color="text.secondary">
                    Carregando produtos...
                </Typography>
            </Box>
    )
}