"use client";

import * as React from "react";
import { PanelLeftIcon } from "lucide-react";
import { cn } from "cn";

type SidebarContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

function SidebarProvider({
  children,
  className,
  defaultOpen = true,
  ...props
}: React.ComponentProps<"div"> & { defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen);

  const value = React.useMemo<SidebarContextValue>(
    () => ({ open, setOpen, toggle: () => setOpen((state) => !state) }),
    [open],
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-wrapper"
        className={cn(
          "group/sidebar-wrapper flex min-h-svh w-full",
          className,
        )}
        style={
          { "--sidebar-width": "16rem" } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

function Sidebar({
  className,
  children,
  ...props
}: React.ComponentProps<"aside">) {
  const { open, setOpen } = useSidebar();

  return (
    <>
      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}

      <aside
        data-slot="sidebar"
        data-state={open ? "open" : "closed"}
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[var(--sidebar-width)] flex-col overflow-hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-200 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          "md:sticky md:inset-y-auto md:top-0 md:h-svh md:translate-x-0 md:shrink-0",
          open
            ? "md:w-[var(--sidebar-width)]"
            : "md:w-0 md:border-r-0",
          className,
        )}
        {...props}
      >
        {children}
      </aside>
    </>
  );
}

function SidebarTrigger({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { toggle } = useSidebar();

  return (
    <button
      type="button"
      data-slot="sidebar-trigger"
      onClick={toggle}
      aria-label="Toggle sidebar"
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring",
        className,
      )}
      {...props}
    >
      <PanelLeftIcon aria-hidden className="size-4" />
    </button>
  );
}

function SidebarHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

function SidebarContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto",
        className,
      )}
      {...props}
    />
  );
}

function SidebarFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

function SidebarGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn(
        "relative flex w-full min-w-0 flex-col p-2",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupAction({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="sidebar-group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-4 items-center justify-center rounded-md text-sidebar-foreground/70 outline-none transition-colors hover:text-sidebar-foreground focus-visible:ring-3 focus-visible:ring-sidebar-ring",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
};
