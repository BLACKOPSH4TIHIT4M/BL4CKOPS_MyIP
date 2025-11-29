"use client";

import { useState } from "react";
import { Search, Globe, Wifi, Shield, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CyberBackground from "@/components/CyberBackground";

export default function ReconnaissancePage() {
  const [ipAddress, setIpAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [ipData, setIpData] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleIPLookup = async () => {
    setLoading(true);
    try {
      // Simulated IP lookup
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIpData({
        ip: ipAddress || "203.0.113.0",
        country: "Indonesia",
        city: "Jakarta",
        isp: "Telkom Indonesia",
        timezone: "Asia/Jakarta",
        latitude: "-6.2088",
        longitude: "106.8456"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              IP Reconnaissance
            </h1>
            <p className="text-muted-foreground text-lg">
              Advanced IP intelligence and network analysis tools
            </p>
          </div>

          <Tabs defaultValue="lookup" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="lookup">
                <Search className="w-4 h-4 mr-2" />
                IP Lookup
              </TabsTrigger>
              <TabsTrigger value="dns">
                <Globe className="w-4 h-4 mr-2" />
                DNS Leak
              </TabsTrigger>
              <TabsTrigger value="webrtc">
                <Wifi className="w-4 h-4 mr-2" />
                WebRTC
              </TabsTrigger>
              <TabsTrigger value="connectivity">
                <Shield className="w-4 h-4 mr-2" />
                Connectivity
              </TabsTrigger>
            </TabsList>

            {/* IP Lookup Tab */}
            <TabsContent value="lookup" className="space-y-6">
              <Card className="cyber-card p-6">
                <h2 className="text-2xl font-bold mb-4">IP Address Lookup</h2>
                <p className="text-muted-foreground mb-6">
                  Enter an IP address to get detailed geolocation and ISP information
                </p>
                
                <div className="flex gap-4 mb-6">
                  <Input
                    placeholder="Enter IP address (e.g., 8.8.8.8)"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                    className="cyber-input"
                  />
                  <Button 
                    onClick={handleIPLookup} 
                    disabled={loading}
                    className="cyber-button"
                  >
                    {loading ? "Scanning..." : "Lookup"}
                  </Button>
                </div>

                {ipData && (
                  <div className="space-y-4 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(ipData).map(([key, value]) => (
                        <div key={key} className="p-4 rounded-lg bg-background/50 border border-primary/20">
                          <div className="text-sm text-muted-foreground mb-1 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="font-mono text-primary flex items-center justify-between">
                            {value as string}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(value as string)}
                              className="h-8 w-8 p-0"
                            >
                              {copied ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* DNS Leak Test Tab */}
            <TabsContent value="dns" className="space-y-6">
              <Card className="cyber-card p-6">
                <h2 className="text-2xl font-bold mb-4">DNS Leak Test</h2>
                <p className="text-muted-foreground mb-6">
                  Check if your DNS requests are being leaked outside your VPN tunnel
                </p>
                
                <Button className="cyber-button">
                  <Shield className="w-4 h-4 mr-2" />
                  Start DNS Leak Test
                </Button>

                <div className="mt-6 p-4 rounded-lg bg-background/50 border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    This test will query multiple DNS servers to detect potential leaks
                  </p>
                </div>
              </Card>
            </TabsContent>

            {/* WebRTC Test Tab */}
            <TabsContent value="webrtc" className="space-y-6">
              <Card className="cyber-card p-6">
                <h2 className="text-2xl font-bold mb-4">WebRTC Leak Test</h2>
                <p className="text-muted-foreground mb-6">
                  Detect if your real IP address is being exposed via WebRTC
                </p>
                
                <Button className="cyber-button">
                  <Wifi className="w-4 h-4 mr-2" />
                  Check WebRTC
                </Button>

                <div className="mt-6 p-4 rounded-lg bg-background/50 border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    WebRTC can bypass VPN tunnels and reveal your actual IP address
                  </p>
                </div>
              </Card>
            </TabsContent>

            {/* Connectivity Test Tab */}
            <TabsContent value="connectivity" className="space-y-6">
              <Card className="cyber-card p-6">
                <h2 className="text-2xl font-bold mb-4">Connectivity Test</h2>
                <p className="text-muted-foreground mb-6">
                  Test your connection to various global servers
                </p>
                
                <Button className="cyber-button">
                  <Globe className="w-4 h-4 mr-2" />
                  Test Connectivity
                </Button>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["Americas", "Europe", "Asia-Pacific"].map((region) => (
                    <div key={region} className="p-4 rounded-lg bg-background/50 border border-primary/20">
                      <div className="text-sm text-muted-foreground mb-2">{region}</div>
                      <div className="text-2xl font-bold text-primary">-- ms</div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}