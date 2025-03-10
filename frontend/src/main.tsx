// @ts-nocheck
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { BrowserRouter } from "react-router-dom";
import WebFont from "webfontloader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster, toast } from "sonner";
const queryClient = new QueryClient();

WebFont.load({
  google: {
    families: ["Poppins:300,400,500,600,700"],
  },
});
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </BrowserRouter>
    {import.meta.env.VITE_API_NODE_ENV === "development" && (
      <ReactQueryDevtools initialIsOpen={true} />
    )}
  </QueryClientProvider>
  // </StrictMode>
);
