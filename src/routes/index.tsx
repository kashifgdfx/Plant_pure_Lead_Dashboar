import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LogOut } from "lucide-react";
import SettingsView from "../components/settings/SettingView";

import LeadsView from "../components/leads/LeadsView";
import ReportsView from "../components/reports/ReportsView";

import DashboardView from "../components/dashboard/DashboardView";
import InboxView from "../components/inbox/InboxView";
import {
  LayoutDashboard,
  Users,
  Inbox,
  Globe,
  Settings,
  BarChart3,
} from "lucide-react";

import { FaInstagram, FaFacebook } from "react-icons/fa6";
import { ImWhatsapp } from "react-icons/im";
import { LEADS } from "../data/leads";
import type { Channel, Tab } from "../types/crm";
import NavItem from "../components/sidebar/NavItem";
import ChannelNav from "../components/sidebar/ChannelNav";

export const Route = createFileRoute("/")({
  component: LeadsApp,
});

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate({ to: "/login" });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-3 rounded-xl  border-input bg-sidebar px-4 py-3 text-sm font-medium text-red-400 transition-all hover:bg-background"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </button>
  );
}

function LeadsApp() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [activeChannel, setActiveChannel] = useState<Channel | "all">("all");
  const [activeId, setActiveId] = useState<string>(LEADS[0]?.id || "");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  console.log("Render LeadsApp");

  // 1. Memoized Filtered Leads List
  const filtered = useMemo(() => {
    const lowerQuery = query.toLowerCase().trim();
    return LEADS.filter((l) => {
      const matchesChannel =
        activeChannel === "all" || l.channel === activeChannel;
      const matchesQuery =
        !lowerQuery ||
        l.name.toLowerCase().includes(lowerQuery) ||
        l.product.toLowerCase().includes(lowerQuery);

      return matchesChannel && matchesQuery;
    });
  }, [activeChannel, query]);

  // 2. Safely Get Active Lead Reference
  const active = useMemo(() => {
    return LEADS.find((l) => l.id === activeId) ?? filtered[0] ?? LEADS[0];
  }, [activeId, filtered]);

  // 3. Channel Wise Counts Memoized Safely
  const counts = useMemo(() => {
    return {
      all: LEADS.length,
      website: LEADS.filter((l) => l.channel === "website").length,
      instagram: LEADS.filter((l) => l.channel === "instagram").length,
      facebook: LEADS.filter((l) => l.channel === "facebook").length,
      whatsapp: LEADS.filter((l) => l.channel === "whatsapp").length,
    };
  }, []);

  return (
    /* added 'notranslate' layout wrapper to prevent translation engine from crashing input elements */
    <div className="notranslate grid h-screen grid-cols-[260px_1fr] bg-background text-foreground">
      {/* --- SIDEBAR PANEL --- */}
      <aside className="flex flex-col border-r border-input bg-sidebar text-sidebar-foreground">
        {/* Branding Logo Section */}
        <div className="flex h-[87px] items-center border-b border-input bg-[#FEFDF9] px-5">
          <img src="/logo.png" alt="PlantPure" className="h-12 w-auto" />
          <div className="ml-3">
            <h2 className="text-2xl font-bold text-[#1d2b1f]">PlantPure</h2>
          </div>
        </div>

        {/* Primary View Navigation */}
        <div className="mt-4 flex flex-col gap-1 px-4">
          <NavItem
            icon={LayoutDashboard}
            label="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <NavItem
            icon={Inbox}
            label="Inbox"
            badge="6"
            active={activeTab === "inbox"}
            onClick={() => setActiveTab("inbox")}
          />
          <NavItem
            icon={Users}
            label="Leads"
            active={activeTab === "leads"}
            onClick={() => setActiveTab("leads")}
          />
          <NavItem
            icon={BarChart3}
            label="Reports"
            active={activeTab === "reports"}
            onClick={() => setActiveTab("reports")}
          />
          <NavItem
            icon={Settings}
            label="Settings"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
        </div>

        {/* Channel Specific Navigation Filter inside Inbox View */}
        {activeTab === "inbox" && (
          <>
            <div className="mt-6 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] opacity-60">
              Channels
            </div>
            <ChannelNav
              active={activeChannel === "all"}
              onClick={() => setActiveChannel("all")}
              icon={Inbox}
              label="All channels"
              count={counts.all}
            />
            <ChannelNav
              active={activeChannel === "website"}
              onClick={() => setActiveChannel("website")}
              icon={Globe}
              label="Website"
              count={counts.website}
              dot="var(--channel-web)"
            />
            <ChannelNav
              active={activeChannel === "instagram"}
              onClick={() => setActiveChannel("instagram")}
              icon={FaInstagram}
              label="Instagram"
              count={counts.instagram}
              dot="var(--channel-instagram)"
            />
            <ChannelNav
              active={activeChannel === "facebook"}
              onClick={() => setActiveChannel("facebook")}
              icon={FaFacebook}
              label="Facebook"
              count={counts.facebook}
              dot="var(--channel-facebook)"
            />
            <ChannelNav
              active={activeChannel === "whatsapp"}
              onClick={() => setActiveChannel("whatsapp")}
              icon={ImWhatsapp}
              label="WhatsApp"
              count={counts.whatsapp}
              dot="var(--channel-whatsapp)"
            />
          </>
        )}

        {/* Footer Settings Area */}
        <div className="mt-auto p-4">
          <LogoutButton />
        </div>
      </aside>

      {/* --- MAIN WORKSPACE WORK AREA --- */}
      <main className="flex flex-col overflow-hidden">
        {activeTab === "dashboard" && <DashboardView />}
        {activeTab === "inbox" && (
          <InboxView
            activeChannel={activeChannel}
            filtered={filtered}
            active={active}
            setActiveId={setActiveId}
            query={query}
            setQuery={setQuery}
            draft={draft}
            setDraft={setDraft}
          />
        )}
        {activeTab === "leads" && (
          <LeadsView query={query} setQuery={setQuery} />
        )}
        {activeTab === "reports" && <ReportsView />}
        {activeTab === "settings" && <SettingsView />}
      </main>
    </div>
  );
}
