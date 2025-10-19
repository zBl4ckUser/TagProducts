import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
    TextField, 
    Button, 
    Box, 
    Typography, 
    Alert, 
    Paper, 
    CircularProgress,
    Container,
    InputAdornment,
    Fade,
    Stack,
    Chip
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api";
import { useState } from "react";
import { 
    AddCircleOutline, 
    AttachMoney, 
    Description, 
    Image as ImageIcon,
    CheckCircle 
} from "@mui/icons-material";

const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

const schema = z.object({
    nome: z.string()
        .min(3, "O nome deve ter no mínimo 3 caracteres")
        .max(50, "O nome deve ter no máximo 50 caracteres"),
    preco: z.number({ error: "O preço deve ser um número" })
        .min(10, "O preço mínimo é R$ 10,00"),
    descricao: z.string()
        .min(30, "A descrição deve ter no mínimo 30 caracteres")
        .max(255, "A descrição deve ter no máximo 255 caracteres"),
    imagem: z.any()
        .refine((files) => files?.length == 1 ? files?.[0]?.size <= MAX_FILE_SIZE : true, `Tamanho máximo de 5MB.`)
        .refine((files) => files?.length == 1 ? ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type) : true, "Apenas .jpg e .png são aceitos.")
        .optional(),
});

type FormValues = z.infer<typeof schema>;

const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});

export default function ProductRegisterPage() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });
    const [backendErrors, setBackendErrors] = useState<string[]>([]);

    const selectedImage = watch("imagem");
    const descricao = watch("descricao");

    const onSubmit = async (data: FormValues) => {
        try {
            let imageBase64: string | null = null;
            if (data.imagem && data.imagem.length > 0) {
                imageBase64 = await toBase64(data.imagem[0]);
            }

            const productData = {
                ...data,
                imagem: imageBase64,
            };

            const result = await createProduct(productData);
            navigate(`/produtos/exibir?idProduto=${result.id}`, { 
                state: { successMessage: "Novo Produto Cadastrado!" } 
            });
        } catch (error: any) {
            setBackendErrors([error.message]);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Fade in timeout={600}>
                <Paper 
                    elevation={3} 
                    sx={{ 
                        p: 5, 
                        borderRadius: 3,
                        background: 'white',
                        border: '1px solid rgba(102, 126, 234, 0.1)',
                    }}
                >
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Box
                            sx={{
                                display: 'inline-flex',
                                p: 2,
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                mb: 2,
                            }}
                        >
                            <AddCircleOutline sx={{ fontSize: 48, color: 'white' }} />
                        </Box>
                        <Typography 
                            variant="h3" 
                            component="h1" 
                            gutterBottom
                            sx={{ 
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Novo Produto
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                            Preencha os campos abaixo para cadastrar um novo produto
                        </Typography>
                    </Box>

                    {/* Error Alert */}
                    {backendErrors.length > 0 && (
                        <Fade in>
                            <Alert 
                                severity="error" 
                                sx={{ 
                                    mb: 3,
                                    borderRadius: 2,
                                    fontWeight: 600
                                }}
                                onClose={() => setBackendErrors([])}
                            >
                                {backendErrors.map((error, index) => (
                                    <div key={index}>{error}</div>
                                ))}
                            </Alert>
                        </Fade>
                    )}

                    {/* Form */}
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                        <Stack spacing={3}>
                            {/* Nome do Produto */}
                            <TextField
                                {...register("nome")}
                                label="Nome do Produto"
                                fullWidth
                                variant="outlined"
                                error={!!errors.nome}
                                helperText={errors.nome?.message}
                                disabled={isSubmitting}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CheckCircle color={errors.nome ? "error" : "action"} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    }
                                }}
                            />

                            {/* Preço */}
                            <TextField
                                {...register("preco", { valueAsNumber: true })}
                                label="Preço do Produto"
                                fullWidth
                                variant="outlined"
                                type="number"
                                error={!!errors.preco}
                                helperText={errors.preco?.message || "Valor mínimo: R$ 10,00"}
                                disabled={isSubmitting}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AttachMoney color={errors.preco ? "error" : "action"} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    }
                                }}
                            />

                            {/* Descrição */}
                            <Box>
                                <TextField
                                    {...register("descricao")}
                                    label="Descrição Completa"
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    error={!!errors.descricao}
                                    helperText={errors.descricao?.message}
                                    disabled={isSubmitting}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 2 }}>
                                                <Description color={errors.descricao ? "error" : "action"} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                        }
                                    }}
                                />
                                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Chip 
                                        label={`${descricao?.length || 0} / 255 caracteres`}
                                        size="small"
                                        color={(descricao?.length || 0) >= 30 ? "success" : "default"}
                                        sx={{ fontWeight: 600 }}
                                    />
                                </Box>
                            </Box>

                            {/* Imagem */}
                            <Box>
                                <TextField
                                    {...register("imagem")}
                                    type="file"
                                    label="Imagem do Produto"
                                    fullWidth
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={!!errors.imagem}
                                    helperText={errors.imagem?.message as string || "PNG ou JPG, máximo 5MB (opcional)"}
                                    disabled={isSubmitting}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <ImageIcon color={errors.imagem ? "error" : "action"} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                        }
                                    }}
                                />
                                {selectedImage && selectedImage.length > 0 && (
                                    <Chip 
                                        label={`Arquivo selecionado: ${selectedImage[0].name}`}
                                        size="small"
                                        color="success"
                                        icon={<ImageIcon />}
                                        sx={{ mt: 1, fontWeight: 600 }}
                                    />
                                )}
                            </Box>

                            {/* Submit Button */}
                            <Box sx={{ mt: 2, position: 'relative' }}>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    size="large"
                                    fullWidth 
                                    disabled={isSubmitting}
                                    startIcon={!isSubmitting && <AddCircleOutline />}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 2,
                                        fontWeight: 700,
                                        fontSize: '1.1rem',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #5568d3 0%, #6a3e8e 100%)',
                                            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                                            transform: 'translateY(-2px)',
                                        },
                                        '&:disabled': {
                                            background: '#e0e0e0',
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {isSubmitting ? 'Cadastrando...' : 'Cadastrar Produto'}
                                </Button>
                                {isSubmitting && (
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            marginTop: '-12px',
                                            marginLeft: '-12px',
                                        }}
                                    />
                                )}
                            </Box>
                        </Stack>
                    </Box>
                </Paper>
            </Fade>
        </Container>
    );
}