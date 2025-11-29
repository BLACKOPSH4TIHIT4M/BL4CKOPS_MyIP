"use client";

import { useState } from "react";
import { Zap, Globe, Activity, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CyberBackground from "@/components/CyberBackground";

export default function DiagnosticsPage() {
  const [testing, setTesting] = useState(false);
  const [speedData, setSpeedData] = useState<any>(null);

  const handleSpeedTest = async () => {
    setTesting(true);
    try {
      // Simulate speed test
      await new Promise(resolve => setTimeout(resolve, 3000));
      setSpeedData({
        download: Math.floor(Math.random() * 100 + 50),
        upload: Math.floor(Math.random() * 50 + 20),
        ping: Math.floor(Math.random() * 30 + 10)
      });
    } finally {
      setTesting(false);
    }
  };

  const globalServers = [
    { region: "🇮🇩 Jakarta", latency: 12, status: "excellent" },
    { region: "🇸🇬 Singapore", latency: 28, status: "good" },
    { region: "🇯🇵 Tokyo", latency: 85, status: "good" },
    { region: "🇺🇸 San Francisco", latency: 165, status: "fair" },
    { region: "🇬🇧 London", latency: 215, status: "fair" },
    { region: "🇦🇺 Sydney", latency: 142, status: "fair" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-500";
      case "good": return "text-primary";
      case "fair": return "text-yellow-500";
      default: return "text-red-500";
    }
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
              Network Diagnostics
            </h1>
            <p className="text-muted-foreground text-lg">
              Comprehensive network performance analysis and monitoring
            </p>
          </div>

          <Tabs defaultValue="speed" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="speed">
                <Zap className="w-4 h-4 mr-2" />
                Speed Test
              </TabsTrigger>
              <TabsTrigger value="latency">
                <Globe className="w-4 h-4 mr-2" />
                Global Latency
              </TabsTrigger>
              <TabsTrigger value="mtr">
                <Activity className="w-4 h-4 mr-2" />
                MTR Test
              </TabsTrigger>
              <TabsTrigger value="monitor">
                <TrendingUp className="w-4 h-4 mr-2" />
                Monitor
              </TabsTrigger>
            </TabsList>

            {/* Speed Test Tab */}
            <TabsContent value="speed" className="space-y-6">
              <Card className="cyber-card p-6">
                <h2 className="text-2xl font-bold mb-4">Internet Speed Test</h2>
                <p className="text-muted-foreground mb-6">
                  Measure your connection download, upload speeds and latency
                </p>
                
                <div className="text-center mb-8">
                  <Button 
                    onClick={handleSpeedTest}
                    disabled={testing}
                    size="lg"
                    className="cyber-button"
                  >
                    {testing ? (
                      <>
                        <Activity className="w-5 h-5 mr-2 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Start Speed Test
                      </>
                    )}
                  </Button>
                </div>

                {testing && (
                  <div className="space-y-4 animate-in fade-in duration-500">
                    <Progress value={33} className="h-2" />
                    <p className="text-center text-muted-foreground">
                      Testing connection speed...
                    </p>
                  </div>
                )}

                {speedData && !testing && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
                    <div className="p-6 rounded-lg bg-background/50 border border-primary/20 text-center">
                      <div className="text-sm text-muted-foreground mb-2">Download</div>
                      <div className="text-4xl font-bold cyber-glow mb-1">
                        {speedData.download}
                      </div>
                      <div className="text-sm text-muted-foreground">Mbps</div>
                    </div>
                    <div className="p-6 rounded-lg bg-background/50 border border-primary/20 text-center">
                      <div className="text-sm text-muted-foreground mb-2">Upload</div>
                      <div className="text-4xl font-bold cyber-glow mb-1">
                        {speedData.upload}
                      </div>
                      <div className="text-sm text-muted-foreground">Mbps</div>
                    </div>
                    <div className="p-6 rounded-lg bg-background/50 border border-primary/20 text-center">
                      <div className="text-sm text-muted-foreground mb-2">Ping</div>
                      <div className="text-4xl font-bold cyber-glow mb-1">
                        {speedData.ping}
                      </div>
                      <div className="text-sm text-muted-foreground">ms</div>
                    </div>
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Global Latency Tab */}
            <TabsContent value="latency" className="space-y-6">
              <Card className="cyber-card p-6">
                <h2 className="text-2xl font-bold mb-4">Global Latency Checker</h2>
                <p className="text-muted-foreground mb-6">
                  Test your connection latency to servers around the world
                </p>
                
                <div className="space-y-3">
                  {globalServers.map((server, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg bg-background/50 border border-primary/20 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{server.region.split(" ")[0]}</div>
                        <div>
                          <div className="font-mono font-semibold">
                            {server.region.split(" ")[1]}
                          </div>
                          <div className={`text-sm capitalize ${getStatusColor(server.status)}`}>
                            {server.status}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {server.latency}
                        </div>
                        <div className="text-sm text-muted-foreground">ms</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* MTR Test Tab */}
            <TabsContent value="mtr" className="space-y-6">
              <Card className="cyber-card p-6">
                <h2 className="text-2xl font-bold mb-4">MTR Network Test</h2>
                <p className="text-muted-foreground mb-6">
                  Trace network route and diagnose connection issues
                </p>
                
                <Button className="cyber-button">
                  <Activity className="w-4 h-4 mr-2" />
                  Start MTR Test
                </Button>

                <div className="mt-6 p-4 rounded-lg bg-background/50 border border-primary/20 font-mono text-sm">
                  <div className="text-muted-foreground mb-2">Ready to trace route...</div>
                  <div className="text-primary">$ mtr --report --report-cycles 10 target-host</div>
                </div>
              </Card>
            </TabsContent>

            {/* Monitor Tab */}
            <TabsContent value="monitor" className="space-y-6">
              <Card className="cyber-card p-6">
                <h2 className="text-2xl font-bold mb-4">Real-Time Monitor</h2>
                <p className="text-muted-foreground mb-6">
                  Monitor your network performance in real-time
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-lg bg-background/50 border border-primary/20">
                    <div className="text-sm text-muted-foreground mb-2">Packet Loss</div>
                    <div className="text-3xl font-bold text-primary">0.2%</div>
                    <Progress value={0.2} className="h-1 mt-4" />
                  </div>
                  <div className="p-6 rounded-lg bg-background/50 border border-primary/20">
                    <div className="text-sm text-muted-foreground mb-2">Jitter</div>
                    <div className="text-3xl font-bold text-primary">3ms</div>
                    <Progress value={10} className="h-1 mt-4" />
                  </div>
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