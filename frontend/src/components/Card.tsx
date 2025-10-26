import { Card, CardContent, CardMedia, Typography, Modal, Box, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import type { Product } from "../types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
    product: Product;
    openModal?: boolean;
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 400, md: 500 },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}

export default function ProductCard({ product, openModal }: ProductCardProps) {
    const [open, setOpen] = useState(openModal || false);
    const navigate = useNavigate();

    useEffect(() => {
        if (openModal) {
            setOpen(true);
        }
    }, [openModal]);

    const handleOpen = () => {
        setOpen(true);
        navigate(`/produtos/exibir?idProduto=${product.id}`);
    };

    const handleClose = () => {
        setOpen(false);
        navigate(`/produtos/exibir`);
    };

    return (
        <>
            <Card sx={{
                maxWidth: 345,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'box-shadow 0.3s',
                cursor: 'pointer',
                '&:hover': {
                    boxShadow: 6,
                }
            }}
                onClick={handleOpen}
            >
                <CardMedia
                    sx={{ height: 140, backgroundSize: 'contain' }}
                    image={product.imagem || "/img_notfound.svg"}
                    title={product.nome}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.nome}
                    </Typography>
                    <Typography variant="h6" color="primary">
                        {formatCurrency(product.preco)}
                    </Typography>
                </CardContent>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="product-details-modal-title"
                aria-describedby="product-details-modal-description"
            >
                <Box sx={modalStyle}>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <CardMedia
                        component="img"
                        height="194"
                        image={product.imagem || "/img_notfound.svg"}
                        alt={product.nome}
                        sx={{ objectFit: 'contain', mb: 2 }}
                    />
                    <Typography id="product-details-modal-title" variant="h6" component="h2">
                        {product.nome}
                    </Typography>
                    <Typography variant="h5" color="primary" sx={{ mt: 1 }}>
                        {formatCurrency(product.preco)}
                    </Typography>
                    <Typography id="product-details-modal-description" sx={{ mt: 2 }}>
                        {product.descricao}
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}