import React, { useState, useEffect } from "react";

const PWAInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // Prevent Chrome’s automatic prompt
      setDeferredPrompt(event);
      setShowButton(true); // Show install button
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt(); // Show install prompt

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the PWA install.");
      } else {
        console.log("User dismissed the PWA install.");
      }
      setDeferredPrompt(null);
      setShowButton(false);
    });
  };

  return (
    showButton && (
      <button
        onClick={handleInstallClick}
        className="px-4 py-2 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-700 transition"
      >
        📥 Install Admin Panel
      </button>
    )
  );
};

export default PWAInstallButton;
