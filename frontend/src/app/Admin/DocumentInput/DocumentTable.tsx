"use client";
import React, { useEffect, useState } from "react";

interface Document {
  id: number;
  tracking_code: string;
  title: string;
  type: string;
  sender_name: string;
  recipient_name: string;
  description: string;
  file_url: string;
  status: string;
  current_location: string;
  created_by: number;
  created_at: string;
  updated_at: string;
}

const DocumentTable = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/document", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();
        if (!res.ok) setError(data.message || data.error || "Failed to fetch documents.");
        else setDocuments(data);
      } catch (err) {
        setError("Error fetching documents.");
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  if (loading) return <div>Loading documents...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Tracking Code</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Type</th>
            <th className="px-4 py-2 border">Sender</th>
            <th className="px-4 py-2 border">Recipient</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Created At</th>
          </tr>
        </thead>
        <tbody>
          {documents.map(doc => (
            <tr key={doc.id}>
              <td className="px-4 py-2 border font-mono">{doc.tracking_code}</td>
              <td className="px-4 py-2 border">{doc.title}</td>
              <td className="px-4 py-2 border">{doc.type}</td>
              <td className="px-4 py-2 border">{doc.sender_name}</td>
              <td className="px-4 py-2 border">{doc.recipient_name}</td>
              <td className="px-4 py-2 border">{doc.status}</td>
              <td className="px-4 py-2 border">{new Date(doc.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable;
