import * as React from "react";
import Container from "@mui/material/Container";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <Container
      maxWidth="sm"
      // style={{ maxWidth: "768px"}}
    >
      <LoginForm />
    </Container>
  );
}
