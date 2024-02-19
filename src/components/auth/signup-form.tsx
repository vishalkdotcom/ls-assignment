"use client";

import * as React from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MuiLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import { isEmailAlreadyUsed, isLoggedIn } from "@/lib/auth";
import { useAppDispatch } from "@/lib/hooks";
import { createUser } from "@/lib/features/users/usersSlice";

type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  if (isLoggedIn()) {
    redirect("/");
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.preventDefault();

    if (!isFormValid({ firstName, lastName, email, password })) {
      window.alert("Please fill all the fields.");
      return;
    }

    if (isEmailAlreadyUsed(email)) {
      window.alert("Email already used. Please try another email.");
      return;
    }

    dispatch(createUser({ firstName, lastName, email, password }));
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create your account
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <MuiLink href="/auth/login" variant="body2" component={Link}>
              Already have an account? Login
            </MuiLink>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

function isFormValid({ firstName, lastName, email, password }: SignUpFormData) {
  if (!firstName || !lastName || !email || !email.includes("@") || !password) {
    return false;
  }
  return true;
}
