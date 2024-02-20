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
  const isAuthenticated = isLoggedIn();

  function handleLogout() {
    router.refresh();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar>
            <TwitterIcon sx={{ mr: { xs: "auto", sm: 1 } }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                display: { xs: "none", sm: "flex" },
                mr: "auto",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Twitter Clone
            </Typography>
            {isAuthenticated ? (
              <LoggedInUser onLogout={handleLogout} />
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
      <Button
        size="small"
        variant="outlined"
        color="inherit"
        onClick={handleLogout}
      >
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
        size="small"
        variant="outlined"
        color="inherit"
        component={Link}
      >
        Login
      </Button>
      <Button href="/auth/signup" size="small" color="inherit" component={Link}>
        Sign Up
      </Button>
    </Box>
  );
}
