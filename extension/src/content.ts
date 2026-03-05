/**
 * ListOnce extension – content script.
 * Injected on Facebook Marketplace / OfferUp listing pages.
 * When user clicks "Fill from ListOnce", we auto-fill title, price, description.
 * User remains logged in and clicks Publish on the platform. We do NOT submit the form.
 */

const LISTONCE_FILL_BUTTON_ID = "listonce-fill-btn";

function createFillButton(): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.id = LISTONCE_FILL_BUTTON_ID;
  btn.textContent = "Fill from ListOnce";
  btn.className = "listonce-fill-button";
  btn.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 9999;
    padding: 10px 16px;
    background: #171717;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `;
  btn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "GET_LISTING" }, (response) => {
      if (response?.ok) {
        // TODO: map response to platform-specific selectors and fill fields
        console.log("[ListOnce] Fill placeholder", response);
      }
    });
  });
  return btn;
}

function init(): void {
  // Avoid double injection
  if (document.getElementById(LISTONCE_FILL_BUTTON_ID)) return;
  const btn = createFillButton();
  document.body.appendChild(btn);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
