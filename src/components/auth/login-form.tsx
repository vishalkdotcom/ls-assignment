"use client";

import * as React from "react";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MuiLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

import { doLogin } from "@/lib/auth";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";
import { useMounted } from "@/hooks/use-mounted";
import { CircularProgress } from "@mui/material";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const hasMounted = useMounted();
  useAuthRedirect();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid({ email, password })) {
      window.alert("Please fill all the fields.");
      return;
    }

    const loginSuccess = doLogin(email, password);
    if (loginSuccess) {
      router.push("/");
    } else {
      window.alert("Invalid username or password.");
    }
  };

  if (!hasMounted) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

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
        Login into your account
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <MuiLink href="/auth/signup" variant="body2" component={Link}>
              {"Don't have an account? Sign Up"}
            </MuiLink>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

function isFormValid({ email, password }: LoginFormData) {
  if (!email || !email.includes("@") || !password) {
    return false;
  }
  return true;
}
