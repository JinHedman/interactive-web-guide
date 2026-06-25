"use client";

import { useEffect } from "react";
import { markRead } from "@/lib/progress";

// Silently marks a chapter as read when the component mounts.
// Drop this in the lesson page component.
export default function MarkRead({ chapterId }: { chapterId: string }) {
  useEffect(() => {
    markRead(chapterId);
  }, [chapterId]);

  return null;
}
