import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TokenSwapForm } from "@/components/TokenSwapForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="dark min-h-screen gradient-bg">
        {/* Background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
          <TokenSwapForm />
        </main>

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            classNames: {
              toast: "glass border-border/50",
              title: "text-foreground",
              description: "text-muted-foreground",
            },
          }}
        />
      </div>
    </QueryClientProvider>
  );
}

export default App;
