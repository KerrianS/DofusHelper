import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import oeufDofus from '../../assets/img/oeufDofus.png';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#1E1E1E',
});

const NavLink = styled('span')({
  color: 'white',
  cursor: 'pointer',
  padding: '0.5rem 1rem',
  fontFamily: "'Poppins', sans-serif",
  fontSize: '0.95rem',
  fontWeight: 500,
  '&:hover': {
    textDecoration: 'underline',
  },
});

const BrandContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const LogoImage = styled('img')({
  width: '30px',
  height: '30px',
});

const BrandName = styled('span')({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600,
  fontSize: '1.2rem',
});

function Header() {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = React.useState(() => {
        const storedMode = localStorage.getItem('darkMode');
        return storedMode !== null ? JSON.parse(storedMode) : false;
    });

    React.useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        <StyledAppBar position="static">
            <Toolbar>
                <NavLink onClick={() => navigate('/')}>
                    <BrandContainer>
                        <LogoImage src={oeufDofus} alt="Dofus Egg" />
                        <BrandName>DofusHelper</BrandName>
                    </BrandContainer>
                </NavLink>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <NavLink onClick={() => navigate('/craft')}>Craft</NavLink>
                    <NavLink onClick={() => navigate('/resources')}>Ressources</NavLink>
                    <NavLink onClick={() => navigate('/archimonstres')}>Archimonstres</NavLink>
                </Box>
            </Toolbar>
        </StyledAppBar>
    );
}

export default Header;
