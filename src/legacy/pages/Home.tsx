import { Container, Grid, Typography } from '@mui/material';
import PageCard from '../components/nav/PageCard';
import { SITEMAP } from '../constants';

const Home = () => {

  return (
    <Container>
      <Typography variant='h2' sx={{ mb: 4 }} >Facial Recognition Database Management System</Typography>
      <Grid container sx={{ flexGrow: 1 }} spacing={2}>
        {SITEMAP.filter((page) => page.category !== 'Home').map((page) => (
          <Grid item xs={12} md={6} lg={4}>
            <PageCard page={page} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
