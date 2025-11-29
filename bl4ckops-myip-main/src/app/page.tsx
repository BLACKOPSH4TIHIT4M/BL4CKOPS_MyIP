"use client";

import Link from "next/link";
import { Shield, Search, Activity, Zap, Globe, Lock, Terminal, Radar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CyberBackground from "@/components/CyberBackground";

export default function Home() {
  const features = [
    {
      icon: Search,
      title: "IP Lookup",
      description: "Advanced geolocation and ISP information lookup",
      href: "/reconnaissance"
    },
    {
      icon: Activity,
      title: "Network Diagnostics",
      description: "Comprehensive speed and latency testing",
      href: "/diagnostics"
    },
    {
      icon: Lock,
      title: "DNS Leak Test",
      description: "Detect DNS leaks and ensure privacy",
      href: "/reconnaissance"
    },
    {
      icon: Globe,
      title: "WHOIS Lookup",
      description: "Domain registration and ownership data",
      href: "/features"
    },
    {
      icon: Terminal,
      title: "WebRTC Test",
      description: "Check for WebRTC IP leaks",
      href: "/reconnaissance"
    },
    {
      icon: Radar,
      title: "Port Scanner",
      description: "Analyze open ports and services",
      href: "/features"
    }
  ];

  return (
    <div className="min-h-screen relative">
      <CyberBackground />
      <Navigation />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto text-center space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono text-primary">Advanced Network Intelligence</span>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold cyber-glow">
                BL4CKOPS
              </h1>
              
              <div className="flex items-center justify-center gap-2 text-xl md:text-2xl">
                <span className="text-primary">🇮🇩</span>
                <h2 className="font-mono text-muted-foreground">
                  IP Reconnaissance Tool
                </h2>
              </div>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Multi-Source IP Lookup & Network Diagnostics Platform
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/reconnaissance">
                  <Button size="lg" className="cyber-button text-primary-foreground font-mono text-lg px-8">
                    <Terminal className="w-5 h-5 mr-2" />
                    Start Reconnaissance
                  </Button>
                </Link>
                <Link href="/features">
                  <Button size="lg" variant="outline" className="cyber-button font-mono text-lg px-8">
                    <Zap className="w-5 h-5 mr-2" />
                    View All Features
                  </Button>
                </Link>
              </div>

              {/* Creator Credit */}
              <div className="pt-8">
                <p className="text-sm text-muted-foreground">
                  Developed by{" "}
                  <span className="text-primary font-mono font-bold cyber-glow">
                    H4TIHIT4M
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent to-black/50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Reconnaissance Arsenal
              </h2>
              <p className="text-muted-foreground">
                Professional-grade tools for network intelligence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <Link key={index} href={feature.href}>
                  <Card className="cyber-card p-6 cursor-pointer group">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-mono font-semibold mb-2 group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 border-t border-primary/20">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { value: "10+", label: "Security Tools" },
                { value: "99.9%", label: "Uptime" },
                { value: "<100ms", label: "Response Time" },
                { value: "24/7", label: "Monitoring" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold cyber-glow mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-mono">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}