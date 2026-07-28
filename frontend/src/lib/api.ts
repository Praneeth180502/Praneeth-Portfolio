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

const API_BASE = "/api";

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
