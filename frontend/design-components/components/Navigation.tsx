"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Shield, Terminal, Activity, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: Shield },
    { href: "/reconnaissance", label: "IP Reconnaissance", icon: Terminal },
    { href: "/diagnostics", label: "Network Diagnostics", icon: Activity },
    { href: "/features", label: "Features", icon: Settings },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-primary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Shield className="w-8 h-8 text-primary group-hover:text-primary/80 transition-colors" />
              <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/30 transition-all" />
            </div>
            <span className="font-mono text-xl font-bold cyber-glow">
              BL4CKOPS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
              >
                <link.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Selector */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm" className="cyber-button">
              🇮🇩 ID
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-primary/30">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Button variant="outline" size="sm" className="w-full cyber-button">
                🇮🇩 Bahasa Indonesia
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}