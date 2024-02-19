import type { Metadata } from "next";
import * as React from "react";

import Providers from "@/app/providers";
import Navbar from "@/components/navbar";
import { Box } from "@mui/material";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: "0px" }}>
        <Providers>
          <Navbar />
          <Box component="main" sx={{ mt: 4, mb: 8 }}>
            {props.children}
          </Box>
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "Coding assignment",
};
