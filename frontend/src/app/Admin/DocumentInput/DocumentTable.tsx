"use client";
import React, { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import QRCode from "qrcode";

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

const MY_NAME = "Carpel Sweet Dreams Lanto";
const SECRET_KEY = "e32d628e89a003e6d5c121041033714a9b361d1f30e608558e3d4b3aef388063"; // Change this to a secure value

const DocumentTable = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [qrModal, setQrModal] = useState<{ visible: boolean; qrUrl: string | null }>({ visible: false, qrUrl: null });
  const [scanModal, setScanModal] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [scanError, setScanError] = useState<string>("");
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let html5QrCode: Html5Qrcode | null = null;
    let running = false;
    setScanError("");

    if (scanModal && scannerRef.current) {
      html5QrCode = new Html5Qrcode(scannerRef.current.id);
      html5QrCode
        .start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: 250,
          },
          (decodedText) => {
            try {
              const parsed = JSON.parse(decodedText);
              const { tracking_code, owner, hash } = parsed;
              const rawData = JSON.stringify({ tracking_code, owner });
              const expectedHash = generateSecureHash(rawData);

              if (expectedHash === hash && owner === MY_NAME) {
                setScanResult({ valid: true, ...parsed });
              } else {
                setScanResult({ error: "Tampered or invalid QR data" });
              }

              if (running) html5QrCode?.stop();
              running = false;
            } catch {
              setScanResult({ error: "Invalid QR format" });
            }
          },
          () => {}
        )
        .then(() => {
          running = true;
        })
        .catch(() => {
          setScanError("No camera found or cannot access camera.");
        });
    }

    return () => {
      if (html5QrCode && running) html5QrCode.stop().catch(() => {});
    };
  }, [scanModal]);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/document/all", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();
        if (!res.ok) setError(data.message || data.error || "Failed to fetch documents.");
        else setDocuments(data);
      } catch {
        setError("Error fetching documents.");
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  function generateSecureHash(data: string): string {
    const encoder = new TextEncoder();
    const key = encoder.encode(SECRET_KEY);
    const text = encoder.encode(data);
    const hashBuffer = new Uint8Array([...key, ...text]);
    let hash = 0;
    for (let i = 0; i < hashBuffer.length; i++) {
      hash = (hash << 5) - hash + hashBuffer[i];
      hash |= 0;
    }
    return hash.toString();
  }

  const handleGenerateQR = async (trackingCode: string) => {
    const payload = { tracking_code: trackingCode, owner: MY_NAME };
    const rawData = JSON.stringify(payload);
    const hash = generateSecureHash(rawData);
    const qrData = JSON.stringify({ ...payload, hash });

    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    await QRCode.toCanvas(canvas, qrData, {
      errorCorrectionLevel: "H",
      width: 300,
      margin: 2,
      color: {
        dark: "#222",
        light: "#fff",
      },
    });

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.font = "bold 28px Arial";
      const text = MY_NAME;
      const textWidth = ctx.measureText(text).width;
      const textHeight = 32;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.fillStyle = "#fff";
      ctx.fillRect(centerX - textWidth / 2 - 8, centerY - textHeight / 2, textWidth + 16, textHeight);

      ctx.fillStyle = "#222";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, centerX, centerY);
    }

    setQrModal({ visible: true, qrUrl: canvas.toDataURL() });
  };

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
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td className="px-4 py-2 border font-mono">{doc.tracking_code}</td>
              <td className="px-4 py-2 border">{doc.title}</td>
              <td className="px-4 py-2 border">{doc.type}</td>
              <td className="px-4 py-2 border">{doc.sender_name}</td>
              <td className="px-4 py-2 border">{doc.recipient_name}</td>
              <td className="px-4 py-2 border">{doc.status}</td>
              <td className="px-4 py-2 border">{new Date(doc.created_at).toLocaleString()}</td>
              <td className="px-4 py-2 border">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  onClick={() => handleGenerateQR(doc.tracking_code)}
                >
                  Generate QR
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* QR Modal */}
      {qrModal.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg relative min-w-[350px]">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setQrModal({ visible: false, qrUrl: null })}
            >
              ✕
            </button>
            <h2 className="mb-4 text-lg font-bold">QR Code</h2>
            {qrModal.qrUrl && <img src={qrModal.qrUrl} alt="QR Code" style={{ width: 300, height: 300 }} />}
            <div className="mt-2 text-sm text-gray-600">Scan to verify. Tamper-protected QR with owner name.</div>
            <button className="mt-4 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700" onClick={() => setScanModal(true)}>Scan QR</button>
          </div>
        </div>
      )}

      {/* QR Scan Modal */}
      {scanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg relative min-w-[350px]">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => {
                setScanModal(false);
                setScanResult(null);
                setScanError("");
              }}
            >
              ✕
            </button>
            <h2 className="mb-4 text-lg font-bold">Scan QR Code</h2>
            {scanError ? (
              <div className="text-red-600 mb-4">{scanError}</div>
            ) : (
              <div ref={scannerRef} id="qr-scanner" style={{ width: 300, height: 300, margin: "auto" }} />
            )}
            {scanResult && scanResult.valid && (
              <div className="mt-4 p-4 border rounded-lg bg-gray-50 shadow">
                <div className="font-bold text-lg mb-2">Valid QR</div>
                <div className="mb-1"><span className="font-semibold">Tracking Code:</span> {scanResult.tracking_code}</div>
                <div className="mb-1"><span className="font-semibold">Owner:</span> {scanResult.owner}</div>
                <div className="mb-1 text-green-700 font-semibold">✔️ Verified</div>
              </div>
            )}
            {scanResult && scanResult.error && (
              <div className="mt-4 text-red-600">{scanResult.error}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentTable;
