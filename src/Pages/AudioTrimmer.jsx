import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions";

export default function AudioTrimmer({ onTrimmed }) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [audioFile, setAudioFile] = useState(null);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    if (!wavesurferRef.current) {
      const ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#0ff",
        progressColor: "#0f0",
        height: 100,
        responsive: true,
        normalize: true,
        plugins: [
          RegionsPlugin.create({
            dragSelection: {
              color: "rgba(0,255,0,0.3)",
            },
          }),
        ],
      });

      ws.on("ready", () => {
        ws.enableDragSelection({
          color: "rgba(0,255,0,0.3)",
        });
      });

      ws.on("region-created", (r) => {
        // Remove all other regions
        Object.values(ws.regions.list).forEach((reg) => {
          if (reg.id !== r.id) reg.remove();
        });

        if (r.end - r.start > 5) {
          r.update({ end: r.start + 5 });
        }
        setRegion(r);
      });

      ws.on("region-updated", (r) => {
        if (r.end - r.start > 5) {
          r.update({ end: r.start + 5 });
        }
        setRegion(r);
      });

      wavesurferRef.current = ws;
    }

    return () => {
      wavesurferRef.current?.destroy();
      wavesurferRef.current = null;
    };
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setAudioFile(file);
    setRegion(null);
    wavesurferRef.current.load(url);
  };

  const handlePreview = () => {
    if (!region || !wavesurferRef.current) {
      alert("No region selected.");
      return;
    }
    wavesurferRef.current.play(region.start, region.end);
  };

  const handleSave = () => {
    if (!region || !audioFile) {
      alert("Please trim an audio region first.");
      return;
    }

    const blobUrl = URL.createObjectURL(audioFile);
    onTrimmed({
      blobUrl,
      startTime: region.start,
      endTime: region.end,
    });
  };

  return (
    <div style={{ color: "#fff", marginTop: "1rem" }}>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <div ref={waveformRef} style={{ margin: "1rem 0" }} />

      {/* Show preview and save buttons only if a region is selected */}
      {region && (
        <>
          <p>
            ⏱ Trimmed from {region.start.toFixed(2)}s to{" "}
            {region.end.toFixed(2)}s
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={handlePreview}
              style={{
                background: "#00f",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
              }}
            >
              ▶️ Preview Trim
            </button>
            <button
              onClick={handleSave}
              style={{
                background: "#0f0",
                color: "#000",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
              }}
            >
              ✅ Save Trim Info
            </button>
          </div>
        </>
      )}
    </div>
  );
}