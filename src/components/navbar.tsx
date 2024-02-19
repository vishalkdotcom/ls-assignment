"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";

import { doLogout, isLoggedIn } from "@/lib/auth";

export default function Navbar() {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = React.useState(() =>
    isLoggedIn()
  );

  React.useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar>
            <TwitterIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{ mr: "auto", color: "inherit", textDecoration: "none" }}
            >
              Twitter Clone
            </Typography>
            {isAuthenticated ? (
              <LoggedInUser onLogout={() => router.push("/")} />
            ) : (
              <AuthLinks />
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
type LoggedInUserProps = {
  onLogout: () => void;
};

function LoggedInUser({ onLogout }: LoggedInUserProps) {
  function handleLogout() {
    doLogout();
    onLogout();
  }

  return (
    <Box sx={{ display: "inline-flex", gap: 2 }}>
      <Button variant="outlined" color="inherit" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}

function AuthLinks() {
  return (
    <Box sx={{ display: "inline-flex", gap: 2 }}>
      <Button
        href="/auth/login"
        variant="outlined"
        color="inherit"
        component={Link}
      >
        Login
      </Button>
      <Button href="/auth/signup" color="inherit" component={Link}>
        Sign Up
      </Button>
    </Box>
  );
}
