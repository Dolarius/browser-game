import { DailyWordleGame } from "@/components/wordle/DailyWordleGame";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-1 items-center justify-center bg-page px-3 py-4 text-page-foreground sm:px-6">
      <DailyWordleGame />
    </main>
  );
}
