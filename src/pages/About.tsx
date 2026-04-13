import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Award, Users, Leaf, Heart, Building2, User } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSiteContent, useCompanyFacts } from "@/hooks/useDynamicContent";
import { Skeleton } from "@/components/ui/skeleton";

const highlights = [
  { icon: Award, label: "40+ Years of Experience" },
  { icon: Heart, label: "High Purity & Long Shelf Life" },
  { icon: Users, label: "Custom Aroma Solutions" },
  { icon: Leaf, label: "Environment Friendly Products" },
];

const About = () => {
  const revealRef = useScrollReveal();
  const { data: about, isLoading: aboutLoading } = useSiteContent("about");
  const { data: facts, isLoading: factsLoading } = useCompanyFacts();

  return (
    <>
      <Navbar />
      <PageHeader subtitle="About Us" title="Crafting Excellence Since 1984" />

      <div ref={revealRef}>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-16">
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <div className="reveal-item opacity-0 translate-y-8 transition-all duration-700">
                  {aboutLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-2/3" />
                    </div>
                  ) : (
                    <>
                      <p className="font-body text-muted-foreground leading-relaxed text-lg mb-6">
                        {about?.intro}
                      </p>
                      <p className="font-body text-muted-foreground leading-relaxed">
                        {about?.mission}
                      </p>
                    </>
                  )}
                </div>

                <div className="space-y-6 reveal-item opacity-0 translate-y-8 transition-all duration-700">
                  <div className="bg-card rounded-xl p-6 border border-border hover-scale">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                        <User className="text-gold" size={28} />
                      </div>
                      <div>
                        {aboutLoading ? (
                          <>
                            <Skeleton className="h-5 w-40 mb-1" />
                            <Skeleton className="h-4 w-28" />
                          </>
                        ) : (
                          <>
                            <h3 className="font-heading font-semibold text-secondary text-lg">
                              {about?.founder_name ?? "Mr. Mohd. Rafiq Attarwala"}
                            </h3>
                            <p className="font-body text-gold text-sm">
                              {about?.founder_title ?? "Founder & Proprietor"}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">
                      {aboutLoading ? <Skeleton className="h-16 w-full" /> : about?.founder_bio}
                    </p>
                  </div>

                  <div className="bg-card rounded-xl p-6 border border-border hover-scale">
                    <div className="flex items-center gap-3 mb-4">
                      <Building2 className="text-gold" size={22} />
                      <h3 className="font-heading font-semibold text-secondary">Company Facts</h3>
                    </div>
                    <ul className="space-y-2 font-body text-sm text-muted-foreground">
                      {factsLoading
                        ? Array.from({ length: 5 }).map((_, i) => (
                            <li key={i} className="flex justify-between">
                              <Skeleton className="h-4 w-28" />
                              <Skeleton className="h-4 w-32" />
                            </li>
                          ))
                        : facts?.map((f) => (
                            <li key={f.label} className="flex justify-between">
                              <span>{f.label}</span>
                              <span className="text-secondary font-medium">{f.value}</span>
                            </li>
                          ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {highlights.map((h, i) => (
                <div
                  key={h.label}
                  className="reveal-item opacity-0 translate-y-8 transition-all duration-700 bg-card rounded-xl p-6 text-center border border-border hover:border-gold/30 hover-scale group"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <h.icon className="text-gold" size={28} />
                  </div>
                  <p className="font-body font-medium text-secondary text-sm">{h.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default About;
