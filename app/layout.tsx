import type { Metadata } from "next";
import "./globals.css";
const origin = "https://shreeji-furniture.panchalparth8696.chatgpt.site";
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: "Shreeji Furniture Ahmedabad | Furniture & Turnkey Interior Contractor",
  description: "Furniture and interior contractor in Ranip, Ahmedabad. 22+ years of custom furniture, modular kitchens and complete 2 BHK, 3 BHK and 4 BHK turnkey interiors. Serving Ahmedabad and nearby areas.",
  alternates: { canonical: "/" },
  openGraph: { title: "Shreeji Furniture | From Empty Space to Your Dream Home", description: "One contractor. Everything covered. Furniture, kitchen, electrical, lighting and complete home interiors.", type: "website", locale: "en_IN", url: origin, siteName: "Shreeji Furniture" },
  twitter: { card: "summary", title: "Shreeji Furniture | Complete Home Interiors", description: "22+ years of craftsmanship. One trusted partner for your complete home." },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
const schema = { "@context": "https://schema.org", "@type": "HomeAndConstructionBusiness", name: "Shreeji Furniture", description: "Furniture & Interior Contractor providing complete home furniture and turnkey interior solutions, with 22+ years of experience.", url: origin, telephone: "+91-98247-34090", address: {"@type":"PostalAddress", streetAddress:"Ranip", addressLocality:"Ahmedabad", addressRegion:"Gujarat", addressCountry:"IN"}, areaServed: {"@type":"City",name:"Ahmedabad"}, priceRange: "₹10–20+ Lakhs", hasOfferCatalog: { "@type": "OfferCatalog", name: "Complete Home Furniture & Interior Services", itemListElement: ["Complete Home Furniture", "Custom Furniture", "Modular Kitchen", "Bedroom Furniture", "Wardrobes", "TV Units", "Electrical Work", "Decorative Lighting", "False Ceiling", "Painting", "Curtains", "Bathroom Accessories", "Full Turnkey Interior Projects"].map(name=>({"@type":"Offer",itemOffered:{"@type":"Service",name}})) }};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body className="antialiased"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/>{children}</body></html>; }
