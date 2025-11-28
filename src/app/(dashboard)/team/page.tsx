"use client";

import { useState } from "react";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TeamPage() {
  const { tier } = useAuthStore();

  const [users, setUsers] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@slate360.com",
      tier: "creator",
      entitlements_override: { 
        "project-hub": true, 
        geospatial: false, 
        "design-studio": true, 
        "virtual-studio": true,
        "athlete-360": false,
        team: false 
      },
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@construction.com",
      tier: "god",
      entitlements_override: { 
        "project-hub": true, 
        geospatial: true, 
        "design-studio": true, 
        "virtual-studio": true,
        "athlete-360": false,
        team: false 
      },
    },
  ]);

  if (tier !== "enterprise") {
    return (
      <div className="p-6 md:p-12 flex items-center justify-center min-h-[400px] bg-slate-50 rounded-xl">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Enterprise Admin</h1>
          <p className="text-lg text-slate-600 mb-8">Team management and entitlement overrides available on Enterprise plans.</p>
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-12">
            Upgrade to Enterprise
          </Button>
        </div>
      </div>
    );
  }

  const toggleEntitlement = (userId: string, feature: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              entitlements_override: {
                ...user.entitlements_override,
                [feature]: !user.entitlements_override[feature as keyof typeof user.entitlements_override],
              },
            }
          : user
      )
    );
    // TODO: PATCH supabase user_profiles.entitlements_override
    console.log(`Toggled ${feature} for ${userId}`);
  };

  return (
    <div className="space-y-6 p-6 md:p-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Admin</h1>
          <p className="text-slate-500">Manage user tiers and feature entitlements.</p>
        </div>
        <Button>Add User</Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
                <Badge variant="secondary" className="font-mono uppercase px-3 py-1 text-xs">
                  {user.tier}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {(["project-hub", "geospatial", "design-studio", "virtual-studio", "athlete-360", "team"] as const).map((feature) => (
                  <Button
                    key={feature}
                    size="sm"
                    variant={user.entitlements_override[feature] ? "default" : "outline"}
                    className="h-12 justify-start capitalize font-normal text-left"
                    onClick={() => toggleEntitlement(user.id, feature)}
                  >
                    {feature.replace("-", " ")}
                  </Button>
                ))}
              </div>
              <Button className="w-full" variant="outline">
                Save to Supabase
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}