import React, { useMemo, useState } from "react";

type MediaItem = { id: string; name: string; type: string; dataUrl: string };

export default function MediaSelectorModal({
  open,
  onClose,
  media = [],
  onSelect,
  multiSelect = false,
}: {
  open: boolean;
  onClose: () => void;
  media: MediaItem[];
  onSelect: (id: string | string[] | null) => void;
  multiSelect?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 12;
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    if (!query) return media;
    const q = query.toLowerCase();
    return media.filter((m) => m.name.toLowerCase().includes(q));
  }, [media, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice(page * pageSize, page * pageSize + pageSize);

  function toggleSelect(id: string) {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  }

  function confirmSelection() {
    const ids = Object.keys(selected).filter((k) => selected[k]);
    if (multiSelect) {
      onSelect(ids.length ? ids : null);
    } else {
      onSelect(ids.length ? ids[0] : null);
    }
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end md:items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b gap-4">
          <h3 className="font-semibold">Select Media</h3>
          <div className="flex-1 flex items-center gap-3">
            <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(0); }} placeholder="Search media by name" className="w-full p-2 border rounded" />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { setSelected({}); onSelect(null); onClose(); }} className="text-sm px-3 py-1">Clear</button>
            <button onClick={onClose} className="text-sm px-3 py-1">Close</button>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[56vh] overflow-auto">
            {pageItems.length === 0 && <div className="text-sm text-gray-600 col-span-4">No media uploaded yet.</div>}
            {pageItems.map((m) => (
              <div key={m.id} className="bg-gray-50 rounded overflow-hidden flex flex-col items-start text-left border">
                <div className="w-full h-32 bg-black/5">
                  {m.type.startsWith("image/") ? (
                    <img src={m.dataUrl} alt={m.name} className="w-full h-32 object-cover" />
                  ) : (
                    <video src={m.dataUrl} className="w-full h-32 object-cover" />
                  )}
                </div>
                <div className="p-2 text-xs w-full text-left flex items-center justify-between">
                  <div className="truncate pr-2">{m.name}</div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => { if (multiSelect) toggleSelect(m.id); else { onSelect(m.id); onClose(); } }} className="px-2 py-1 text-xs border rounded">Select</button>
                    {multiSelect && (
                      <input type="checkbox" checked={!!selected[m.id]} onChange={() => toggleSelect(m.id)} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className="px-3 py-1 border rounded">Prev</button>
              <span className="text-sm">Page {page + 1} / {totalPages}</span>
              <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="px-3 py-1 border rounded">Next</button>
            </div>
            <div className="flex items-center gap-2">
              {multiSelect && <button onClick={confirmSelection} className="px-3 py-2 bg-[#2D3E4A] text-white rounded">Attach Selected</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
