import { learnPages } from "@/lib/learnPages";
import { LearnLayout } from "@/components/learn/LearnLayout";

export default function Page() {
  return <LearnLayout page={learnPages["analytics-reports"]} />;
}