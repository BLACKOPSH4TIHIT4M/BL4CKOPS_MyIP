"use client";

import { useState } from "react";
import { Shield, Fingerprint, Search, Server, Lock, Eye, Terminal, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CyberBackground from "@/components/CyberBackground";

export default function FeaturesPage() {
  const [domain, setDomain] = useState("");
  const [macAddress, setMacAddress] = useState("");

  const securityChecklist = [
    { name: "DNS Leak Protection", status: "Active", icon: Shield },
    { name: "WebRTC Leak Protection", status: "Active", icon: Lock },
    { name: "IP Masking", status: "Active", icon: Eye },
    { name: "Secure Connection", status: "Verified", icon: Server }
  ];

  const browserFingerprint = {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
    platform: "Win32",
    language: "en-US",
    timezone: "UTC+7",
    resolution: "1920x1080",
    colorDepth: "24-bit"
  };

  return (
    <div className="min-h-screen relative">
      <CyberBackground />
      <Navigation />
      
      <main className="relative z-10 pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold cyber-glow mb-4">
              Advanced Features
            </h1>
            <p className="text-muted-foreground text-lg">
              Professional security tools and network analysis capabilities
            </p>
          </div>

          <Tabs defaultValue="security" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="security">
                <Shield className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="fingerprint">
                <Fingerprint className="w-4 h-4 mr-2" />
                Fingerprint
              </TabsTrigger>
              <TabsTrigger value="mac">
                <Database className="w-4 h-4 mr-2" />
                MAC Lookup
              </TabsTrigger>
              <TabsTrigger value="whois">
                <Search className="w-4 h-4 mr-2" />
                WHOIS
              </TabsTrigger>
            </TabsList>

            {/* Security Checklist Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card className="cyber-card p-6">
                <h2 className="text-2xl font-bold mb-4">Security Checklist</h2>
                <p className="text-muted-foreground mb-6">
                  Comprehensive security status of your connection
                </p>
                
                <div className="space-y-4">
                  {securityChecklist.map((item, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg bg-background/50 border border-primary/20 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-sm text-muted-foreground">Protection enabled</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-green-500 font-mono text-sm">{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-semibold text-green-500">All Systems Secure</div>
                      <div className="text-sm text-muted-foreground">Your connection is protected</div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Browser Fingerprint Tab */}
            <TabsContent value="fingerprint" className="space-y-6">
              <Card className="cyber-card p-6">
                <h2 className="text-2xl font-bold mb-4">Browser Fingerprinting</h2>
                <p className="text-muted-foreground mb-6">
                  Analyze your browser's unique identification markers
                </p>
                
                <Button className="cyber-button mb-6">
                  <Fingerprint className="w-4 h-4 mr-2" />
                  Generate Fingerprint
                </Button>

                <div className="space-y-3">
                  {Object.entries(browserFingerprint).map(([key, value], index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg bg-background/50 border border-primary/20"
                    >
                      <div className="text-sm text-muted-foreground mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="font-mono text-primary text-sm break-all">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* MAC Lookup Tab */}
            <TabsContent value="mac" className="space-y-6">
              <Card className="cyber-card p-6">
                <h2 className="text-2xl font-bold mb-4">MAC Address Lookup</h2>
                <p className="text-muted-foreground mb-6">
                  Identify device manufacturer from MAC address
                </p>
                
                <div className="flex gap-4 mb-6">
                  <Input
                    placeholder="Enter MAC address (e.g., 00:1B:63:84:45:E6)"
                    value={macAddress}
                    onChange={(e) => setMacAddress(e.target.value)}
                    className="cyber-input"
                  />
                  <Button className="cyber-button">
                    Lookup
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
                  <div className="text-sm text-muted-foreground mb-2">Example Results:</div>
                  <div className="space-y-2 font-mono text-sm">
                    <div><span className="text-muted-foreground">Manufacturer:</span> <span className="text-primary">Apple, Inc.</span></div>
                    <div><span className="text-muted-foreground">Address:</span> <span className="text-primary">Cupertino, CA, USA</span></div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* WHOIS Lookup Tab */}
            <TabsContent value="whois" className="space-y-6">
              <Card className="cyber-card p-6">
                <h2 className="text-2xl font-bold mb-4">WHOIS Domain Lookup</h2>
                <p className="text-muted-foreground mb-6">
                  Get detailed domain registration information
                </p>
                
                <div className="flex gap-4 mb-6">
                  <Input
                    placeholder="Enter domain name (e.g., example.com)"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="cyber-input"
                  />
                  <Button className="cyber-button">
                    <Search className="w-4 h-4 mr-2" />
                    Query
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-background/50 border border-primary/20 font-mono text-sm">
                  <div className="text-muted-foreground mb-3">WHOIS Information:</div>
                  <div className="space-y-1 text-primary">
                    <div>Domain Name: example.com</div>
                    <div>Registrar: Example Registrar, Inc.</div>
                    <div>Creation Date: 1995-08-14</div>
                    <div>Expiration Date: 2025-08-13</div>
                    <div>Status: clientTransferProhibited</div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Additional Tools Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="cyber-card p-6">
              <Terminal className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-mono font-semibold mb-2">DNS Resolver</h3>
              <p className="text-sm text-muted-foreground">
                Query DNS records and nameservers
              </p>
            </Card>
            <Card className="cyber-card p-6">
              <Server className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-mono font-semibold mb-2">Port Scanner</h3>
              <p className="text-sm text-muted-foreground">
                Scan for open ports and services
              </p>
            </Card>
            <Card className="cyber-card p-6">
              <Eye className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-mono font-semibold mb-2">Proxy Detector</h3>
              <p className="text-sm text-muted-foreground">
                Identify proxy and VPN usage
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}