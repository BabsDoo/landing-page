import { useEffect, type ReactNode } from 'react';
import { ScrollTrigger } from '@/lib/gsap';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { AuthorityStrip } from '@/components/sections/AuthorityStrip';
import { Services } from '@/components/sections/Services';
import { Method } from '@/components/sections/Method';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline';
import { Tools } from '@/components/sections/Tools';
import { EngagementModels } from '@/components/sections/EngagementModels';
import { About } from '@/components/sections/About';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { ContactForm } from '@/components/sections/ContactForm';
import { Footer } from '@/components/sections/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[8px] focus:bg-gold focus:px-4 focus:py-3 focus:font-bold focus:text-navy-950">
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <AuthorityStrip />
        <Services />
        <Method />
        <ExperienceTimeline />
        <Tools />
        <EngagementModels />
        <About />
        <FinalCTA />
        <ContactForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
