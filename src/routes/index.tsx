import { createFileRoute } from "@tanstack/react-router";

import { OrderProvider } from "@/context/OrderContext";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { CinematicVideo } from "@/components/CinematicVideo";
import { Menu } from "@/components/Menu";
import { RealGallery } from "@/components/RealGallery";
import { About } from "@/components/About";
import { Visit } from "@/components/Visit";
import { Reviews } from "@/components/Reviews";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { CartDrawer } from "@/components/CartDrawer";
import { OrdersModal } from "@/components/OrdersModal";
import { ScrollExperience } from "@/components/ScrollExperience";
import { CAFE } from "@/lib/cafe";

const title = "CAF Cafe — Specialty Coffee & In-House Ordering at Crystal Tower, Kuwait City";
const description =
  "Official CAF Cafe (كاف كافيه) at Crystal Tower, Ahmad Al Jaber St, Kuwait City. Order craft coffee, Dutch Brew, sandwiches & treats directly online. Open daily 7 AM–11 PM.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CafeOrCoffeeShop",
          name: CAFE.name,
          alternateName: CAFE.nameAr,
          telephone: "+96552553551",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Crystal Tower, Ahmad Al Jaber St",
            addressLocality: "Kuwait City",
            addressCountry: "KW",
          },
          openingHours: "Mo-Su 07:00-23:00",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <OrderProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors selection:bg-primary selection:text-primary-foreground relative">
        <ScrollExperience />
        <SiteHeader />
        <main>
          <Hero />
          <CinematicVideo />
          <Menu />
          <RealGallery />
          <About />
          <Visit />
          <Reviews />
        </main>
        <SiteFooter />
        <FloatingWhatsApp />
        <CartDrawer />
        <OrdersModal />
      </div>
    </OrderProvider>
  );
}
