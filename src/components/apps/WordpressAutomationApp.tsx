import React, { useState } from "react";

export default function WordpressAutomationApp() {
  const [content, setContent] = useState("");
  const [sections, setSections] = useState(3);
  const [image, setImage] = useState<File | null>(null);

  const WEBHOOK_URL =
    "https://scs-ltd.app.n8n.cloud/webhook/wordpress-automation";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Your Blog Post Content", content);
    formData.append("Number of Sections", String(sections));

    if (image) {
      formData.append("Gallery_Images", image);
    }

    await fetch(WEBHOOK_URL, {
      method: "POST",
      body: formData,
    });

    alert("Submitted to n8n!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Blog Content"
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <input
        type="number"
        value={sections}
        onChange={(e) => setSections(Number(e.target.value))}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
}
