"use client";

import { useEffect } from "react";
import { markRead, setLastVisited } from "@/lib/progress";

// On mount: marks a chapter as read AND records it as the most recently
// visited chapter (powers the home "Continue where you left off" button).
// Drop this in the lesson page component.
export default function MarkRead({ chapterId }: { chapterId: string }) {
  useEffect(() => {
    markRead(chapterId);
    setLastVisited(chapterId);
  }, [chapterId]);

  return null;
}
