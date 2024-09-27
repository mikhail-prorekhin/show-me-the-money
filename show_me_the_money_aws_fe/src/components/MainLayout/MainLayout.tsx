import React, { PropsWithChildren } from 'react';
import Typography from '@mui/material/Typography';

import Link from '@mui/material/Link';
import Container from "@mui/material/Container";
import Header from "components/MainLayout/Header";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Home
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <Container maxWidth="md">
          {children!}
        </Container>
      </main>
      <footer >
        <Typography align="center" color="textSecondary" component="p">
          Mikhail Prorekhin
        </Typography>
        <Copyright />
      </footer>
    </>
  );
};

export default MainLayout;