import { 
  AppBar, 
  Button, 
  Container, 
  Toolbar, 
  Typography, 
  Box 
} from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Inventory2, AddCircleOutline, Storefront } from '@mui/icons-material';
import './App.css';

function App() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* APP BAR FIXO */}
      <AppBar 
        position="fixed"
        elevation={3}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, sm: 70 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Storefront sx={{ fontSize: 32, mr: 1.5 }} />
            <Typography 
              variant="h5" 
              component={Link} 
              to="/"
              sx={{ 
                fontWeight: 700,
                textDecoration: 'none',
                color: 'inherit',
                letterSpacing: '0.5px',
                '&:hover': { opacity: 0.9 }
              }}
            >
              TagProducts
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              color="inherit" 
              component={Link} 
              to="/produtos/exibir"
              startIcon={<Inventory2 />}
              sx={{
                fontWeight: 600,
                px: 2.5,
                py: 1,
                borderRadius: 2,
                backgroundColor: isActive('/produtos/exibir') ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Produtos
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/produtos/cadastro"
              startIcon={<AddCircleOutline />}
              sx={{
                fontWeight: 600,
                px: 2.5,
                py: 1,
                borderRadius: 2,
                backgroundColor: isActive('/produtos/cadastro') ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Cadastrar
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      
      {/* CONTEÚDO PRINCIPAL */}
      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          background: '#e9ecef',
          // margin: 0,
        }}
      >

        <Container maxWidth={false} disableGutters={true}>
          <Outlet />
        </Container>
      </Box>
      
      {/* FOOTER */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          backgroundColor: '#2c3e50',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" >
          © 2024 TagProducts - Desenvolvido para Tagview
        </Typography>
      </Box>
    </>
  );
}

export default App;
