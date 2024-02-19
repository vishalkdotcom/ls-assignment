import * as React from "react";
import Container from "@mui/material/Container";

import SignUpForm from "@/components/auth/signup-form";

export default function SignUpPage() {
  return (
    <Container
      maxWidth="sm"
      // style={{ maxWidth: "768px"}}
    >
      <SignUpForm />
    </Container>
  );
}
