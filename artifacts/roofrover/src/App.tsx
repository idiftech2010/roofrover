import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Gallery from "@/pages/Gallery";
import CaseStudies from "@/pages/CaseStudies";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Careers from "@/pages/Careers";
import Programs from "@/pages/Programs";
import MemberDetail from "@/pages/MemberDetail";
import ServiceDetail from "@/pages/ServiceDetail";
import BrowseHomes from "@/pages/BrowseHomes";
import VirtualTours from "@/pages/VirtualTours";
import SavedPads from "@/pages/SavedPads";
import Sell from "@/pages/Sell";
import Agents from "@/pages/Agents";
import Admin from "@/pages/Admin";
import AdminDashboard from "@/pages/AdminDashboard";
import BackToTop from "@/components/BackToTop";
import ChatWidget from "@/components/ChatWidget";
import AdminPortalIcon from "@/components/AdminPortalIcon";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/browse-homes" component={BrowseHomes} />
      <Route path="/virtual-tours" component={VirtualTours} />
      <Route path="/saved" component={SavedPads} />
      <Route path="/sell" component={Sell} />
      <Route path="/agents" component={Agents} />
      <Route path="/services/:serviceId/:itemId">
        {(params: { serviceId: string; itemId: string }) => <ServiceDetail serviceId={params.serviceId} itemId={params.itemId} />}
      </Route>
      <Route path="/services/:id">
        {(params: { id: string }) => <ServiceDetail serviceId={params.id} />}
      </Route>
      <Route path="/services" component={Services} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/about" component={About} />
      <Route path="/team/:id">
        {(params: { id: string }) => <MemberDetail memberId={params.id} />}
      </Route>
      <Route path="/programs" component={Programs} />
      <Route path="/careers" component={Careers} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin" component={Admin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
          <BackToTop />
          <ChatWidget />
          <AdminPortalIcon />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
