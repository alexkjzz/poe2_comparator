import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Icon } from "../atoms";
import { useNavigation } from "../../hooks";
import { cn } from "../../utils/cn";

interface SidebarProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Sidebar({ isOpen = true, onOpenChange }: SidebarProps) {
  const [internalOpen, setInternalOpen] = useState(isOpen);
  const location = useLocation();
  const { goHome, goComparator, goSettings } = useNavigation();

  const open = onOpenChange ? isOpen : internalOpen;
  const setOpen = onOpenChange ? onOpenChange : setInternalOpen;

  const menuItems = [
    { id: "home", label: "Home", icon: "search" as const, action: goHome },
    { id: "compare", label: "Compare", icon: "swap" as const, action: goComparator },
    { id: "settings", label: "Settings", icon: "menu" as const, action: goSettings },
  ];

  const isActive = (id: string) => {
    if (id === "home") return location.pathname === "/";
    if (id === "compare") return location.pathname === "/comparator";
    if (id === "settings") return location.pathname === "/settings";
    return false;
  };

  return (
    <>
      {/* Toggle Button (Mobile) */}
      <Button
        variant="ghost"
        size="md"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setOpen(!open)}
      >
        <Icon name={open ? "close" : "menu"} size={20} />
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-card border-r border-border transition-all duration-300 ease-in-out",
          "fixed md:relative h-screen z-40 w-64",
          "transform md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">
              PoE2
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Item Comparator
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors duration-200",
                  "text-sm font-medium",
                  isActive(item.id)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-primary/10 active:bg-primary/20"
                )}
                onClick={() => {
                  item.action();
                  setOpen(false);
                }}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-border pt-4">
            <p className="text-xs text-muted-foreground text-center">
              v0.1.0
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
