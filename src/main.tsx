import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// const queryClient = new QueryClient(); // api 요청의 상태를 저장하는 store 역할
const queryClient = new QueryClient({
  defaultOptions: {
    // global default 설정
    queries: {
      staleTime: 0, // 테스트 편의성을 위함.
      gcTime: 5 * 60 * 1000,

      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
);
