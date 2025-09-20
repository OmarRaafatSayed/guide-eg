import { RequestHandler } from "express";

export const handleAIGuide: RequestHandler = async (req, res) => {
  const { question } = req.body as { question?: string };
  const q = (question ?? "").toLowerCase();
  let answer =
    "I'm your Egypt travel assistant. Ask about attractions, transport, or safety.";

  if (q.includes("pyramids") || q.includes("giza")) {
    answer =
      "The Giza Pyramids are open roughly 8am–5pm. Arrive early, bring water, and consider hiring a certified guide. Best transport: Uber/Taxi or tour bus.";
  } else if (q.includes("metro") || q.includes("transport")) {
    answer =
      "Cairo Metro is affordable and fast for core areas. For door-to-door, use Uber or reputable taxis. Intercity travel: trains (Cairo–Alexandria/Luxor/Aswan).";
  } else if (q.includes("safety") || q.includes("safe")) {
    answer =
      "Stick to busy areas, use registered guides, avoid carrying large sums of cash, and keep a digital copy of your passport. In emergencies dial 122 (Police) or 123 (Ambulance).";
  } else if (
    q.includes("history") ||
    q.includes("pharaoh") ||
    q.includes("temple")
  ) {
    answer =
      "Egypt spans millennia—from Old Kingdom pyramids to New Kingdom temples like Karnak and Philae. Museums in Cairo and Luxor offer great context before site visits.";
  }

  res.json({ answer });
};
