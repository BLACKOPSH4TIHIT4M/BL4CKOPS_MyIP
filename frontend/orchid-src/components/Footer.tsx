"use client";

import Link from "next/link";
import { Shield, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-primary/30 bg-black/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-mono text-lg font-bold cyber-glow">
                BL4CKOPS
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Advanced IP Intelligence Platform for Network Reconnaissance and Security Analysis
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-mono font-semibold mb-4">Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/reconnaissance" className="hover:text-primary transition-colors">
                  IP Lookup
                </Link>
              </li>
              <li>
                <Link href="/reconnaissance" className="hover:text-primary transition-colors">
                  DNS Leak Test
                </Link>
              </li>
              <li>
                <Link href="/diagnostics" className="hover:text-primary transition-colors">
                  Speed Test
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-primary transition-colors">
                  WHOIS Lookup
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-mono font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/features" className="hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-primary transition-colors">
                  API Access
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-primary transition-colors">
                  Security Guide
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-mono font-semibold mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Questions or feedback?<br />
              Get in touch with us.
            </p>
          </div>
        </div>

        <div className="border-t border-primary/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            koreksi diki © 2025 BL4CKOPS. All rights reserved.
          </p>
          <p className="text-sm text-primary font-mono cyber-glow">
            Developed by <span className="font-bold">H4TIHIT4M</span> 🇮🇩
          </p>
        </div>
      </div>
    </footer>
  );
}