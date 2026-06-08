"use client";

import { useEffect, useMemo, useState } from "react";
import { Exercise } from "./types/exercise";
import { fetchBodyParts, fetchExercisesByBodyPart } from "./lib/exercisedb";
import BodyPartSelector, { BODY_PART_DE } from "./components/BodyPartSelector";
import ExerciseGrid from "./components/ExerciseGrid";

export default function HomePage() {
  const [bodyParts, setBodyParts] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initError, setInitError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchBodyParts()
      .then(setBodyParts)
      .catch((e) => setInitError(e.message));
  }, []);

  async function handleSelect(part: string) {
    setSelected(part);
    setExercises([]);
    setQuery("");
    setError(null);
    setLoading(true);
    try {
      const data = await fetchExercisesByBodyPart(part);
      setExercises(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return exercises;
    return exercises.filter(
      (ex) =>
        ex.name.toLowerCase().includes(q) ||
        ex.target.toLowerCase().includes(q) ||
        ex.equipment.toLowerCase().includes(q)
    );
  }, [exercises, query]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            💪 Übungs-Finder
          </h1>
          <p className="text-gray-500 text-lg">
            Wähle einen Körperbereich und entdecke passende Übungen
          </p>
        </div>

        {initError ? (
          <div className="text-center py-8">
            <p className="text-red-600 font-semibold">
              Körperbereiche konnten nicht geladen werden: {initError}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Prüfe deinen API-Key in{" "}
              <code className="bg-gray-100 px-1 rounded">.env.local</code>
            </p>
          </div>
        ) : bodyParts.length === 0 ? (
          <div className="text-center py-8 text-gray-400 animate-pulse">
            Lade Körperbereiche…
          </div>
        ) : (
          <section className="mb-10">
            <BodyPartSelector
              bodyParts={bodyParts}
              selected={selected}
              onSelect={handleSelect}
            />
          </section>
        )}

        {selected && (
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 shrink-0">
                {BODY_PART_DE[selected] ?? selected}
              </h2>

              {!loading && exercises.length > 0 && (
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative flex-1 max-w-sm">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      🔍
                    </span>
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Name, Muskel oder Equipment…"
                      className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-full bg-white shadow-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-300"
                    />
                    {query && (
                      <button
                        onClick={() => setQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <span className="text-sm text-gray-500 shrink-0">
                    {filtered.length} / {exercises.length} Übungen
                  </span>
                </div>
              )}
            </div>

            {!loading && query && filtered.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">🔎</p>
                <p>Keine Übungen für „{query}" gefunden.</p>
              </div>
            )}

            <ExerciseGrid
              exercises={filtered}
              loading={loading}
              error={error}
            />
          </section>
        )}

        {!selected && bodyParts.length > 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-6xl mb-4">🏋️</p>
            <p className="text-lg">Wähle einen Körperbereich oben aus</p>
          </div>
        )}
      </div>
    </main>
  );
}
