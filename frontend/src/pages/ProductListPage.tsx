import {
    Box,
    Grid,
    Pagination,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    Snackbar,
    Alert,
    Container,
    Paper,
    Fade,
    Chip,
    Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "../components/Card";
import { type Product } from "../types";
import { useSearchParams, useLocation } from "react-router-dom";
import { getProducts } from "../api";
import { Inventory2, ViewModule } from "@mui/icons-material";
import LoadingProducts from "../components/LoadingProducts";

export default function ProductListPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const idProduto = searchParams.get("idProduto");

    useEffect(() => {
        if (location.state?.successMessage) {
            setSuccessMessage(location.state.successMessage);
            setSnackbarOpen(true);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    // TODO: O fetchProducts está rodando duas vezes
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleChangeItemsPerPage = (event: any) => {
        setItemsPerPage(event.target.value as number);
        setPage(1);
    };

    const handleSnackbarClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const paginatedProducts = itemsPerPage === products.length
        ? products
        : products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    if (loading) {
        return (
            <LoadingProducts/>
        );
    }

    return (
        <Container maxWidth={false} sx={{ py: 4 }}>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    variant="filled"
                    sx={{
                        width: '100%',
                        fontSize: '1rem',
                        fontWeight: 600
                    }}
                >
                    {successMessage}
                </Alert>
            </Snackbar>

            {/* Header Section */}
            <Fade in timeout={600}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        mb: 4,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #667eea22 0%, #764ba222 100%)',
                        border: '1px solid rgba(102, 126, 234, 0.1)',
                    }}
                >
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        alignItems={{ xs: 'flex-start', md: 'center' }}
                        justifyContent="space-between"
                        spacing={3}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box
                                sx={{
                                    p: 1.5,
                                    borderRadius: 2,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Inventory2 sx={{ fontSize: 32, color: 'white' }} />
                            </Box>
                            <Box>
                                <Typography
                                    variant="h4"
                                    component="h1"
                                    sx={{
                                        fontWeight: 800,
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        mb: 0.5
                                    }}
                                >
                                    Catálogo de Produtos
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500, textAlign: 'left' }}>
                                    {products.length === 0
                                        ? 'Nenhum produto cadastrado'
                                        : `${products.length} produto${products.length !== 1 ? 's' : ''} disponível${products.length !== 1 ? 'is' : ''}`
                                    }
                                </Typography>
                            </Box>
                        </Box>

                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                            alignItems="center"
                            sx={{ width: { xs: '100%', md: 'auto' } }}
                        >
                            <Chip
                                icon={<ViewModule />}
                                label={`Página ${page} de ${Math.max(1, Math.ceil(products.length / itemsPerPage))}`}
                                color="primary"
                                sx={{
                                    fontWeight: 600,
                                    px: 1,
                                    height: 40
                                }}
                            />
                            <FormControl
                                size="small"
                                sx={{
                                    minWidth: 160,
                                    width: { xs: '100%', sm: 'auto' }
                                }}
                            >
                                <InputLabel>Itens por página</InputLabel>
                                <Select
                                    value={itemsPerPage}
                                    onChange={handleChangeItemsPerPage}
                                    label="Itens por página"
                                    sx={{
                                        borderRadius: 2,
                                        fontWeight: 600
                                    }}
                                >
                                    <MenuItem value={10}>10 produtos</MenuItem>
                                    <MenuItem value={20}>20 produtos</MenuItem>
                                    <MenuItem value={50}>50 produtos</MenuItem>
                                    <MenuItem value={products.length}>
                                        Todos ({products.length})
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Stack>
                </Paper>
            </Fade>

            {/* Grid de produtos */}
            <Fade in timeout={800}>
                <Box>
                    {products.length === 0 ? (
                        <Paper
                            elevation={0}
                            sx={{
                                p: 8,
                                textAlign: 'center',
                                borderRadius: 3,
                                border: '2px dashed #e0e0e0'
                            }}
                        >
                            <Inventory2 sx={{ fontSize: 80, color: '#bdbdbd', mb: 2 }} />
                            <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
                                Nenhum produto encontrado
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Comece cadastrando seu primeiro produto!
                            </Typography>
                        </Paper>
                    ) : (
                        <>
                            <Grid container spacing={3}>
                                {paginatedProducts.map((product) => (
                                    <Grid
                                        key={`product-${product.id}`}
                                        size={{
                                            xs:12,
                                            sm:6,
                                            md:4,
                                            lg:3
                                        }}

                                    >
                                        <ProductCard
                                            product={product}
                                            openModal={String(product.id) === idProduto}
                                        />
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Pagination */}
                            {itemsPerPage < products.length && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                                    <Paper
                                        elevation={2}
                                        sx={{
                                            p: 2,
                                            borderRadius: 3,
                                            display: 'inline-flex'
                                        }}
                                    >
                                        <Pagination
                                            count={Math.max(1, Math.ceil(products.length / itemsPerPage))}
                                            page={page}
                                            onChange={handleChangePage}
                                            color="primary"
                                            size="large"
                                            showFirstButton
                                            showLastButton
                                            sx={{
                                                '& .MuiPaginationItem-root': {
                                                    fontWeight: 600,
                                                    fontSize: '1rem'
                                                }
                                            }}
                                        />
                                    </Paper>
                                </Box>
                            )}
                        </>
                    )}
                </Box>
            </Fade>
        </Container>
    );
}