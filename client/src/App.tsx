import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "./hooks/useLanguage";
import NotFound from "@/pages/not-found";
import Home from "./pages/Home";
import TzotzilBible from "./pages/TzotzilBible";
import TzotzilBiblePrivacy from "./pages/TzotzilBiblePrivacy";
import PocimaSalvajePrivacy from "./pages/PocimaSalvajePrivacy";
import CaymusTanks from "./pages/CaymusTanks";
import CaymusTanksPrivacy from "./pages/CaymusTanksPrivacy";
import CaymusTanksSupport from "./pages/CaymusTanksSupport";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tzotzil-bible" component={TzotzilBible} />
      <Route path="/tzotzil-bible/privacy" component={TzotzilBiblePrivacy} />
      <Route path="/pocima-salvaje/privacy" component={PocimaSalvajePrivacy} />
      <Route path="/caymus-tanks" component={CaymusTanks} />
      <Route path="/caymus-tanks/privacy" component={CaymusTanksPrivacy} />
      <Route path="/caymus-tanks/support" component={CaymusTanksSupport} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </LanguageProvider>
  );
}

export default App;
