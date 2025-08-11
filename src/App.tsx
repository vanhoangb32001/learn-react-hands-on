
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Guides from "./pages/Guides";
import TodoDemo from "./pages/demos/TodoDemo";
import ContactDemo from "./pages/demos/ContactDemo";
import DashboardDemo from "./pages/demos/DashboardDemo";
import AppHeader from "@/components/AppHeader";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/demos/todo" element={<TodoDemo />} />
          <Route path="/demos/contact" element={<ContactDemo />} />
          <Route path="/demos/dashboard" element={<DashboardDemo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
