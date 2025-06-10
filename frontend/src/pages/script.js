document.addEventListener("DOMContentLoaded", () => {
    console.log("Custom form script loaded");
    const form = document.querySelector("form.form-container");
    if (!form) {
      console.warn("No form.form-container found!");
      return;
    }
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const data = new FormData(form);
      try {
        const res = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: { "Accept": "application/json" }
        });
        if (res.ok) {
          window.location.href = "/contact";
        } else {
          console.error("Formspree error:", await res.json());
        }
      } catch (err) {
        console.error("Network error:", err);
      }
    });
  });