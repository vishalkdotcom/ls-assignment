"use client";

import * as React from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { makeStore, AppStore } from "@/lib/store";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function StoreProvider({ children }: React.PropsWithChildren) {
  const storeRef = React.useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate
        loading={<Loader />}
        persistor={persistStore(storeRef.current)}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}

function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
      }}
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
      <Typography variant="body2" sx={{ mt: 2, ml: 1.5 }}>
        Loading...
      </Typography>
    </Box>
  );
}
