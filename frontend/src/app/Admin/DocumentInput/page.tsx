"use client";
"use client";
import React, { useState, useEffect } from "react";
import DocumentTable from "./DocumentTable";
import { useRouter } from "next/navigation";

const DocumentInput = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [trackingCode, setTrackingCode] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check for session (simple example: check localStorage for token)
    if (!localStorage.getItem("token")) {
      router.push("/Account/login");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("recipient_name", recipientName);
    formData.append("description", description);
    if (file) formData.append("file", file);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/document/upload", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || data.error || "Upload failed.");
        setTrackingCode("");
      } else if (data.message && data.tracking_code) {
        setMessage("Upload successful!");
        setTrackingCode(data.tracking_code);
      } else {
        setMessage("Upload failed.");
        setTrackingCode("");
      }
    } catch (err) {
      setMessage("Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-white to-blue-600 py-10 flex flex-col items-center">
      <div className="w-full max-w-md mb-10">
        <form className="bg-white p-8 rounded-xl shadow-xl w-full space-y-4" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-center">Document Data Input</h2>
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input type="text" className="w-full border rounded p-2" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="block font-semibold mb-1">Type</label>
            <input type="text" className="w-full border rounded p-2" value={type} onChange={e => setType(e.target.value)} required />
          </div>
          <div>
            <label className="block font-semibold mb-1">Recipient Name</label>
            <input type="text" className="w-full border rounded p-2" value={recipientName} onChange={e => setRecipientName(e.target.value)} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea className="w-full border rounded p-2" value={description} onChange={e => setDescription(e.target.value)} required />
          </div>
          <div>
            <label className="block font-semibold mb-1">File</label>
            <input type="file" className="w-full" onChange={e => setFile(e.target.files?.[0] || null)} required />
          </div>
          {message && <div className="text-center text-blue-600 font-semibold">{message}</div>}
          {trackingCode && (
            <div className="text-center text-green-700 font-bold mt-2">Tracking Code: {trackingCode}</div>
          )}
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg" disabled={loading}>
            {loading ? "Uploading..." : "Upload Document"}
          </button>
        </form>
      </div>
      <div className="w-full max-w-5xl">
        <h3 className="text-xl font-bold mb-4 text-center">All Documents</h3>
        <DocumentTable />
      </div>
    </div>
  );
};

export default DocumentInput;
