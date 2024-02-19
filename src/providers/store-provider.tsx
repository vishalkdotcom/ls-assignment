"use client";

import * as React from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { makeStore, AppStore } from "@/lib/store";

export default function StoreProvider({ children }: React.PropsWithChildren) {
  const storeRef = React.useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate
        loading={<div> Loading...</div>}
        persistor={persistStore(storeRef.current)}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
