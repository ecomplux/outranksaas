"use client";

import { useState, FormEvent } from "react"; // Added FormEvent
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Added Alert
import {
  Sun,
  Box,
  CalendarDays,
  History,
  SettingsIcon,
  Puzzle,
  LinkIcon,
  Repeat,
  Crown,
  DollarSign,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Moon,
  Youtube,
  MousePointerClick,
  Image as ImageIcon,
  Info,
  ExternalLink,
  CheckCircle, // For success alert
  XCircle, // For error alert
  Loader2, // For loading state
  Menu, // For hamburger menu
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock user data
const user = {
  email: "ecomplux@gmail.com",
  subscription: "Trial Subscription",
  articlesPerMonth: 30,
  backlinkCredits: 112,
};

const navItems = [
  { id: "content-planner", name: "Content Planner", icon: CalendarDays },
  { id: "content-history", name: "Content History", icon: History },
  { id: "settings", name: "Settings", icon: SettingsIcon },
  { id: "integrations", name: "Integrations", icon: Puzzle },
  { id: "linking-config", name: "Linking Configuration", icon: LinkIcon, new: true },
  { id: "backlink-exchange", name: "Backlink Exchange", icon: Repeat, beta: true },
];

const addOns = [
  { name: "Human Curated Service", icon: Crown, href: "#" },
  { name: "Get 350+ Backlinks", icon: LinkIcon, href: "#" },
];

const imageStyles = [
  { name: "Brand & Text Realism", imageSrc: "/placeholder-image.jpg", brandColor: "#2b310d", info: true },
  { name: "Watercolor Realism", imageSrc: "/placeholder-image.jpg", info: true },
  { name: "Cinematic Realism", imageSrc: "/placeholder-image.jpg", selected: true },
  { name: "Illustration", imageSrc: "/placeholder-image.jpg" },
  { name: "Sketch", imageSrc: "/placeholder-image.jpg" },
];

type View =
  | "settings"
  | "integrations"
  | "content-planner"
  | "content-history"
  | "linking-config"
  | "backlink-exchange";

// --- Sub-components for different views ---

const SettingsView = () => (
  <>
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 mb-6 gap-4 sm:gap-0">
      <div className="flex flex-wrap items-center gap-2"> {/* Made this flex-wrap for smaller screens */}
        <Button variant="default">Articles</Button>
        <Button variant="ghost">Keywords</Button>
        <Button variant="ghost">Business</Button>
        <Button variant="ghost">Competitors</Button>
        <Button variant="ghost">Blog</Button>
      </div>
    </div>
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Content</CardTitle>
          <div className="flex items-center space-x-2">
            <Label htmlFor="auto-publish" className="text-sm font-normal text-muted-foreground">Auto-publish</Label>
            <Switch id="auto-publish" />
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="language" className="flex items-center gap-1 mb-1">Language <HelpCircle className="h-3 w-3 text-muted-foreground" /></Label>
            <Button variant="outline" id="language" className="w-full justify-between"><span>English</span><ChevronRight className="h-4 w-4" /></Button>
          </div>
          <div>
            <Label htmlFor="tone-style" className="flex items-center gap-1 mb-1">Tone and Style <HelpCircle className="h-3 w-3 text-muted-foreground" /></Label>
            <Button variant="outline" id="tone-style" className="w-full justify-between"><span>Informative</span><ChevronRight className="h-4 w-4" /></Button>
            <Link href="#" className="text-xs text-primary hover:underline mt-1 block">Finetune with your articles</Link>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>SEO</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="internal-links" className="flex items-center gap-1 mb-1">Internal Links <HelpCircle className="h-3 w-3 text-muted-foreground" /></Label>
            <Button variant="outline" id="internal-links" className="w-full justify-between"><span>3 Links</span><ChevronRight className="h-4 w-4" /></Button>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Add a sitemap URL in blog settings to enable internal linking.</p>
            <Button variant="outline" className="w-full">Add Sitemap</Button>
          </div>
        </CardContent>
      </Card>
    </div>
    <Card className="mt-6">
      <CardHeader><CardTitle>Enhancements</CardTitle></CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-3">
        <div>
          <Label htmlFor="add-youtube" className="flex items-center gap-1 mb-1">Add YouTube Video <HelpCircle className="h-3 w-3 text-muted-foreground" /></Label>
          <Button variant="outline" id="add-youtube" className="w-full justify-between"><span>Yes</span><ChevronRight className="h-4 w-4" /></Button>
        </div>
        <div>
          <Label htmlFor="add-cta" className="flex items-center gap-1 mb-1">Add CTA <HelpCircle className="h-3 w-3 text-muted-foreground" /></Label>
          <Button variant="outline" id="add-cta" className="w-full justify-between"><span>Yes</span><ChevronRight className="h-4 w-4" /></Button>
        </div>
        <div>
          <Label htmlFor="include-infographics" className="flex items-center gap-1 mb-1">Include Infographics <HelpCircle className="h-3 w-3 text-muted-foreground" /></Label>
          <Button variant="outline" id="include-infographics" className="w-full justify-between"><span>Yes</span><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </CardContent>
    </Card>
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Image Style</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {imageStyles.map((style) => (
          <Card key={style.name} className={`min-w-[200px] w-[200px] cursor-pointer transition-all ${style.selected ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"}`}>
            <CardContent className="p-0">
              <div className="relative w-full h-32"><Image src={style.imageSrc} alt={style.name} layout="fill" objectFit="cover" className="rounded-t-lg"/></div>
              <div className="p-3">
                <div className="flex items-center justify-between mb-1"><h3 className="text-sm font-medium">{style.name}</h3>{style.info && <HelpCircle className="h-3 w-3 text-muted-foreground" />}</div>
                {style.brandColor && (<div><Label htmlFor={`brand-color-${style.name.replace(/\s+/g, '-')}`} className="text-xs text-muted-foreground">Brand Color</Label><div className="flex items-center gap-2 mt-1"><div className="w-5 h-5 rounded border" style={{ backgroundColor: style.brandColor }}></div><Input type="text" id={`brand-color-${style.name.replace(/\s+/g, '-')}`} defaultValue={style.brandColor} className="h-7 text-xs flex-1" readOnly/></div></div>)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </>
);

const IntegrationsView = () => {
  const [integrationName, setIntegrationName] = useState("My Wordpress Website");
  const [wordpressUrl, setWordpressUrl] = useState("https://mywebsite.com");
  const [username, setUsername] = useState("admin@email.com");
  const [appPassword, setAppPassword] = useState("");
  const [publishStatus, setPublishStatus] = useState("published");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/integrations/wordpress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ integrationName, wordpressUrl, username, appPassword, publishStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Failed with status: ${response.status}`);
      }

      setSuccessMessage(data.message || "Integration successful!");
      // Optionally reset form or redirect
      // setAppPassword(""); // Clear password field on success
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <span>Integrations</span>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-primary font-medium">Create Wordpress Integration</span>
      </div>
      <Card className="max-w-2xl mx-auto w-full">
        <CardHeader>
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-blue-700">
                  Watch YouTube tutorial how to integrate your Wordpress website with Outrank
                  <Link href="#" className="inline-flex items-center ml-1 font-semibold text-blue-600 hover:underline">
                    <ExternalLink className="h-3 w-3 ml-0.5" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {successMessage && (
              <Alert variant="default" className="bg-green-50 border-green-200 text-green-700">
                 <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-700">Success</AlertTitle>
                <AlertDescription className="text-green-700">{successMessage}</AlertDescription>
              </Alert>
            )}
            <div>
              <Label className="pb-2" htmlFor="integrationName">Integration Name <span className="text-red-500">*</span></Label>
              <Input id="integrationName" value={integrationName} onChange={(e) => setIntegrationName(e.target.value)} placeholder="My Wordpress Website" required />
            </div>
            <div>
              <Label className="pb-2" htmlFor="wordpressUrl">Wordpress URL <span className="text-red-500">*</span></Label>
              <Input id="wordpressUrl" value={wordpressUrl} onChange={(e) => setWordpressUrl(e.target.value)} placeholder="https://mywebsite.com" required />
            </div>
            <div>
              <Label className="pb-2" htmlFor="username">Username <span className="text-red-500">*</span></Label>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin@email.com" required />
            </div>
            <div>
              <Label className="pb-2" htmlFor="appPassword">Application Password <span className="text-red-500">*</span></Label>
              <Input id="appPassword" type="password" value={appPassword} onChange={(e) => setAppPassword(e.target.value)} placeholder="Your Application Password" required />
              <p className="text-xs text-muted-foreground mt-1">
                This is special Application Password you can generate in your Wordpress Admin Panel.
                <Link href="#" className="text-primary hover:underline ml-1">Link to the instruction</Link>
              </p>
            </div>
            <div className="pb-2">
              <Label className="pb-2" htmlFor="publishStatus">Publish Status <span className="text-red-500">*</span></Label>
              <Select value={publishStatus} onValueChange={setPublishStatus}>
                <SelectTrigger id="publishStatus"><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Create
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

const GenericView = ({ title }: { title: string }) => (
  <div>
    <h1 className="text-2xl font-semibold">{title}</h1>
    <p>Content for {title} will be displayed here.</p>
  </div>
);

export default function DashboardLayout() {
  const [selectedView, setSelectedView] = useState<View>("settings");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const isDarkMode = false;

  const handleNavItemClick = (view: View) => {
    setSelectedView(view);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false); // Close mobile menu on item click
    }
  };

  const renderView = () => {
    switch (selectedView) {
      case "settings": return <SettingsView />;
      case "integrations": return <IntegrationsView />;
      case "content-planner": return <GenericView title="Content Planner" />;
      case "content-history": return <GenericView title="Content History" />;
      case "linking-config": return <GenericView title="Linking Configuration" />;
      case "backlink-exchange": return <GenericView title="Backlink Exchange" />;
      default: return <SettingsView />; // Default to settings view
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r bg-background sm:flex">
        {/* Sidebar Content (repeated for mobile, consider refactoring to a component) */}
        <div className="flex h-16 shrink-0 items-center border-b px-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold"><span className="text-lg font-bold">Outrank</span></Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">{isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}<span className="sr-only">Toggle theme</span></Button>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="px-4 lg:px-6 mb-4">
            <Button variant="outline" className="w-full justify-between"><div className="flex items-center gap-2"><Box className="h-4 w-4" /><span>SIMPLEINCOME</span></div><ChevronDown className="h-4 w-4" /></Button>
            <p className="text-xs text-muted-foreground mt-1 ml-1">https://simpleincome.net</p>
          </div>
          <ul className="space-y-1 px-2 lg:px-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <Button variant={selectedView === item.id ? "secondary" : "ghost"} className="w-full justify-start gap-3" onClick={() => handleNavItemClick(item.id as View)}>
                  <item.icon className="h-4 w-4" />{item.name}
                  {item.new && (<span className="ml-auto rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary">NEW</span>)}
                  {item.beta && (<span className="ml-auto rounded-md bg-orange-400/20 px-2 py-0.5 text-xs text-orange-500">BETA</span>)}
                </Button>
              </li>
            ))}
          </ul>
          <Separator className="my-4" />
          <div className="px-4 lg:px-6">
            <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Add-ons</p>
            <ul className="space-y-1">
              {addOns.map((item) => (<li key={item.name}><Link href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary" onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}><item.icon className="h-4 w-4" />{item.name}</Link></li>))}
            </ul>
          </div>
        </nav>
        <div className="mt-auto border-t p-4">
          <Button variant="outline" className="w-full mb-4"><DollarSign className="mr-2 h-4 w-4" /> Join Referral Program</Button>
          <div className="flex justify-between text-xs text-muted-foreground mb-4"><span>{user.articlesPerMonth} Articles/mo</span><span>{user.backlinkCredits} Backlink Credits</span></div>
          <Separator className="mb-4" />
          <Button variant="ghost" className="w-full justify-start p-2 h-auto">
            <div className="flex items-center gap-2 w-full">
              <Avatar className="h-8 w-8"><AvatarFallback>{user.email.charAt(0).toUpperCase()}</AvatarFallback></Avatar>
              <div className="flex flex-col items-start"><span className="text-sm font-medium">{user.email}</span><span className="text-xs text-muted-foreground">{user.subscription}</span></div>
              <ChevronDown className="ml-auto h-4 w-4" />
            </div>
          </Button>
          <Button variant="outline" className="w-full mt-2" onClick={() => { signOut({ callbackUrl: '/' }); if (isMobileMenuOpen) setIsMobileMenuOpen(false); }}>
            Log Out
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 sm:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 flex-col border-r bg-background transform transition-transform ease-in-out duration-300 sm:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
         {/* Sidebar Content (repeated for mobile, consider refactoring to a component) */}
         <div className="flex h-16 shrink-0 items-center border-b px-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setIsMobileMenuOpen(false)}><span className="text-lg font-bold">Outrank</span></Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">{isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}<span className="sr-only">Toggle theme</span></Button>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="px-4 lg:px-6 mb-4">
            <Button variant="outline" className="w-full justify-between"><div className="flex items-center gap-2"><Box className="h-4 w-4" /><span>SIMPLEINCOME</span></div><ChevronDown className="h-4 w-4" /></Button>
            <p className="text-xs text-muted-foreground mt-1 ml-1">https://simpleincome.net</p>
          </div>
          <ul className="space-y-1 px-2 lg:px-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <Button variant={selectedView === item.id ? "secondary" : "ghost"} className="w-full justify-start gap-3" onClick={() => handleNavItemClick(item.id as View)}>
                  <item.icon className="h-4 w-4" />{item.name}
                  {item.new && (<span className="ml-auto rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary">NEW</span>)}
                  {item.beta && (<span className="ml-auto rounded-md bg-orange-400/20 px-2 py-0.5 text-xs text-orange-500">BETA</span>)}
                </Button>
              </li>
            ))}
          </ul>
          <Separator className="my-4" />
          <div className="px-4 lg:px-6">
            <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Add-ons</p>
            <ul className="space-y-1">
              {addOns.map((item) => (<li key={item.name}><Link href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}><item.icon className="h-4 w-4" />{item.name}</Link></li>))}
            </ul>
          </div>
        </nav>
        <div className="mt-auto border-t p-4">
          <Button variant="outline" className="w-full mb-4"><DollarSign className="mr-2 h-4 w-4" /> Join Referral Program</Button>
          <div className="flex justify-between text-xs text-muted-foreground mb-4"><span>{user.articlesPerMonth} Articles/mo</span><span>{user.backlinkCredits} Backlink Credits</span></div>
          <Separator className="mb-4" />
          <Button variant="ghost" className="w-full justify-start p-2 h-auto">
            <div className="flex items-center gap-2 w-full">
              <Avatar className="h-8 w-8"><AvatarFallback>{user.email.charAt(0).toUpperCase()}</AvatarFallback></Avatar>
              <div className="flex flex-col items-start"><span className="text-sm font-medium">{user.email}</span><span className="text-xs text-muted-foreground">{user.subscription}</span></div>
              <ChevronDown className="ml-auto h-4 w-4" />
            </div>
          </Button>
          <Button variant="outline" className="w-full mt-2" onClick={() => { signOut({ callbackUrl: '/' }); setIsMobileMenuOpen(false); }}>
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex flex-1 flex-col sm:ml-64"> {/* sm:ml-64 for desktop sidebar */}
        {/* Mobile Header with Hamburger Menu */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:hidden">
          <Button variant="outline" size="icon" className="shrink-0" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">Outrank</Link>
        </header>
        
        <main className="flex-1 p-6 space-y-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
}