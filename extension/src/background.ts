/**
 * ListOnce extension – background service worker (Manifest V3).
 * Listens for messages from popup/content to fetch listing data from web app.
 */

chrome.runtime.onMessage.addListener(
  (
    message: { type: string; payload?: unknown },
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response?: unknown) => void
  ) => {
    if (message.type === "GET_LISTING") {
      // Popup/content will send listing id; we fetch from ListOnce API (user must be logged in via app)
      sendResponse({ ok: true, message: "Placeholder" });
    }
    return true; // keep channel open for async sendResponse
  }
);

export {};
