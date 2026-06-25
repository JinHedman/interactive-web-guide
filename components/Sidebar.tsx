// Server component: fetches chapter list and passes to client sidebar.
import { getAllChapters } from "@/lib/content";
import { MODULE_ORDER } from "@/lib/types";
import SidebarClient from "./SidebarClient";

export default function Sidebar() {
  const chapters = getAllChapters();

  // Build ordered list of present modules
  const presentModules = MODULE_ORDER.filter((m) =>
    chapters.some((c) => c.module === m)
  );
  // Append any modules outside canonical list (future-proof)
  const extra = [
    ...new Set(chapters.map((c) => c.module).filter((m) => !MODULE_ORDER.includes(m as never))),
  ];
  const modules = [...presentModules, ...extra];

  return <SidebarClient chapters={chapters} modules={modules} />;
}
