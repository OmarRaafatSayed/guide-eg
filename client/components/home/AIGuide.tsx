import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function AIGuide() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function ask() {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer(null);
    try {
      const res = await fetch("/api/ai-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer ?? "");
    } catch (err) {
      setAnswer("Sorry, I couldn't fetch an answer right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-primary" /> AI Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            placeholder="Ask about travel or history in Egypt…"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && ask()}
          />
          <Button onClick={ask} disabled={loading}>
            {loading ? "Thinking…" : "Ask"}
          </Button>
        </div>
        {answer && (
          <div className="mt-3 rounded-md border bg-card p-4 text-sm whitespace-pre-wrap">
            {answer}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
