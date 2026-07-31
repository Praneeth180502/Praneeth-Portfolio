export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ChatSource {
  source: string;
  section?: string;
  snippet?: string;
  relevance_score?: number;
}

export interface ChatStreamCallbacks {
  onToken: (token: string) => void;
  onSources?: (sources: ChatSource[]) => void;
  onError?: (error: string) => void;
  onDone?: () => void;
}

const getApiBase = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl) return "/api";
  const cleanUrl = envUrl.replace(/\/+$/, "");
  return cleanUrl.endsWith("/api") ? cleanUrl : `${cleanUrl}/api`;
};

const API_BASE = getApiBase();

export async function sendContactMessage(payload: ContactPayload): Promise<{ status: string; message: string }> {
  const response = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: "Failed to send message" }));
    throw new Error(errorData.detail || "Failed to send message");
  }

  return response.json();
}

export async function streamChatMessage(
  payload: { session_id: string; message: string },
  callbacks: ChatStreamCallbacks
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: "Failed to reach AI assistant" }));
      callbacks.onError?.(errorData.detail || "Server error occurred");
      callbacks.onDone?.();
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      callbacks.onError?.("No response stream available");
      callbacks.onDone?.();
      return;
    }

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith("data:")) continue;

        const dataStr = trimmed.replace(/^data:\s*/, "");
        if (!dataStr) continue;

        try {
          const parsed = JSON.parse(dataStr);
          if (parsed.type === "token" && parsed.content) {
            callbacks.onToken(parsed.content);
          } else if (parsed.type === "sources" && parsed.sources) {
            callbacks.onSources?.(parsed.sources);
          } else if (parsed.type === "error" && parsed.error) {
            callbacks.onError?.(parsed.error);
          } else if (parsed.type === "done") {
            callbacks.onDone?.();
          }
        } catch {
          // Ignore unparseable frames
        }
      }
    }

    callbacks.onDone?.();
  } catch (err: any) {
    callbacks.onError?.(err.message || "Network request failed");
    callbacks.onDone?.();
  }
}

export async function getVisitorCount(): Promise<number> {
  const isNewSession = !sessionStorage.getItem("visited_session_counter");

  // 1. Try Primary Backend API
  try {
    if (isNewSession) {
      await fetch(`${API_BASE}/analytics/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type: "page_view",
          path: window.location.pathname,
          referrer: document.referrer || null,
        }),
      }).catch(() => {});
    }

    const response = await fetch(`${API_BASE}/analytics/visitor-count`);
    if (response.ok) {
      const data = await response.json();
      if (typeof data.count === "number" && data.count > 0) {
        if (isNewSession) sessionStorage.setItem("visited_session_counter", "true");
        return data.count;
      }
    }
  } catch {
    // Backend API unreachable or offline
  }

  // 2. Try global high-availability counter API (CounterAPI)
  try {
    const counterEndpoint = isNewSession
      ? "https://api.counterapi.dev/v1/praneeth_portfolio_navbar/visitors/up"
      : "https://api.counterapi.dev/v1/praneeth_portfolio_navbar/visitors/";

    const res = await fetch(counterEndpoint);
    if (res.ok) {
      const data = await res.json();
      if (isNewSession) sessionStorage.setItem("visited_session_counter", "true");
      if (typeof data.count === "number" && data.count >= 0) {
        return data.count;
      }
    }
  } catch {
    // Public counter API failed
  }

  // 3. Persistent LocalStorage fallback (guarantees baseline count like 1,248+)
  const baseCount = 1248;
  const storedCount = parseInt(localStorage.getItem("praneeth_visitor_count") || "0", 10);
  const currentCount = storedCount > 0 ? storedCount : baseCount;
  const finalCount = isNewSession ? currentCount + 1 : currentCount;

  localStorage.setItem("praneeth_visitor_count", finalCount.toString());
  if (isNewSession) sessionStorage.setItem("visited_session_counter", "true");

  return finalCount;
}

