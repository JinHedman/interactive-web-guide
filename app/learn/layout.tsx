import Sidebar from "@/components/Sidebar";
import LearnShell from "@/components/LearnShell";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LearnShell sidebar={<Sidebar />}>{children}</LearnShell>;
}
