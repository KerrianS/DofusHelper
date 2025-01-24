import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledFooter = styled('footer')({
    backgroundColor: '#1E1E1E',
    color: 'white',
    padding: '40px 0',
    marginTop: 'auto',
});

const FooterLink = styled(Link)({
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },
});

const FooterSection = styled(Box)({
    marginBottom: '20px',
});

const FooterTitle = styled(Typography)({
    fontWeight: 600,
    marginBottom: '16px',
});

function Footer() {
    return (
        <StyledFooter>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <FooterSection>
                            <FooterTitle variant="h6">DofusHelper</FooterTitle>
                            <Typography variant="body2">
                                Votre assistant pour optimiser votre expérience sur Dofus
                            </Typography>
                        </FooterSection>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FooterSection>
                            <FooterTitle variant="h6">Liens Utiles</FooterTitle>
                            <Box display="flex" flexDirection="column" gap={1}>
                                <FooterLink to="/craft">Craft</FooterLink>
                                <FooterLink to="/resources">Ressources</FooterLink>
                                <FooterLink to="/archimonstres">Archimonstres</FooterLink>
                            </Box>
                        </FooterSection>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FooterSection>
                            <FooterTitle variant="h6">Ressources Externes</FooterTitle>
                            <Box display="flex" flexDirection="column" gap={1}>
                                <FooterLink to="https://www.dofus.com" target="_blank">Site Officiel Dofus</FooterLink>
                                <FooterLink to="https://www.dofusdb.fr" target="_blank">DofusDB</FooterLink>
                            </Box>
                        </FooterSection>
                    </Grid>
                </Grid>
                <Box mt={4} pt={3} borderTop="1px solid rgba(255, 255, 255, 0.1)">
                    <Typography variant="body2" align="center">
                        © {new Date().getFullYear()} DofusHelper. Tous droits réservés.
                    </Typography>
                </Box>
            </Container>
        </StyledFooter>
    );
}

export default Footer;
