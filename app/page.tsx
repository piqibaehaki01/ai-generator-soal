"use client";

import { useState } from "react";

export default function Home() {
  const [mapel, setMapel] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [hasil, setHasil] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSoal = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mapel,
          jumlah,
        }),
      });

      const data = await res.json();

      setHasil(data.soal);
    } catch (error) {
      console.log(error);
      alert("Terjadi error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-5">AI Generator Soal</h1>

      <input
        type="text"
        placeholder="Mapel"
        value={mapel}
        onChange={(e) => setMapel(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <input
        type="number"
        placeholder="Jumlah Soal"
        value={jumlah}
        onChange={(e) => setJumlah(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={generateSoal}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Loading..." : "Generate"}
      </button>

      <div className="mt-10 whitespace-pre-wrap">{hasil}</div>
    </div>
  );
}
