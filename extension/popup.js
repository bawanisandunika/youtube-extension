const PUBLISHABLE_KEY = "pk_test_YXJ0aXN0aWMtc3dpbmUtMjguY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!PUBLISHABLE_KEY) {
  throw new Error("Please add your Clerk Publishable Key to popup.js");
}

const clerk = new Clerk(PUBLISHABLE_KEY);

async function initPopup() {
  try {
    await clerk.load();

    if (!clerk.user) {
      // Redirect to login if not authenticated
      window.location.href = "login.html";
      return;
    }

    // Mount UserButton for sign-out
    clerk.mountUserButton(document.getElementById("user-button"), {
      afterSignOutUrl: "login.html"
    });

    // Existing popup logic
    document.getElementById("audioOnly").addEventListener("change", (e) => {
      document.getElementById("audioFormat").disabled = !e.target.checked;
    });

    document.getElementById("downloadBtn").addEventListener("click", () => {
      const options = {
        resolution: document.getElementById("resolution").value,
        format: document.getElementById("format").value,
        audioOnly: document.getElementById("audioOnly").checked,
        audioFormat: document.getElementById("audioFormat").value,
        subtitles: document.getElementById("subtitles").checked,
        subtitleLang: document.getElementById("subtitleLang").value
      };

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const url = tabs[0].url;
        chrome.runtime.sendMessage({ action: "startDownload", url, options });
      });
    });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.runtime.sendMessage({ action: "getPreview", url: tabs[0].url }, (response) => {
        if (response && response.previewUrl) {
          document.getElementById("preview").src = response.previewUrl;
        }
      });
    });
  } catch (error) {
    console.error("Failed to initialize popup:", error);
  }
}

document.addEventListener("DOMContentLoaded", initPopup);