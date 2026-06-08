"use client";

import { useEffect, useMemo, useState } from "react";
import { Exercise } from "./types/exercise";
import { fetchBodyParts, fetchExercisesByBodyPart } from "./lib/exercisedb";
import BodyPartSelector, { BODY_PART_DE } from "./components/BodyPartSelector";
import ExerciseGrid from "./components/ExerciseGrid";
import { useFavorites } from "./hooks/useFavorites";

type Tab = "suche" | "favoriten";

export default function HomePage() {
  const [tab, setTab] = useState<Tab>("suche");
  const [bodyParts, setBodyParts] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initError, setInitError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const { favorites, toggle, isFavorite } = useFavorites();

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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 sm:mb-3 tracking-tight">
            💪 Übungs-Finder
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg">
            Wähle einen Körperbereich und entdecke passende Übungen
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white dark:bg-slate-800 rounded-full shadow-sm border border-gray-200 dark:border-slate-600 p-1 gap-1">
            <button
              onClick={() => setTab("suche")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                tab === "suche"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              🔍 Übungen
            </button>
            <button
              onClick={() => setTab("favoriten")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                tab === "favoriten"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              ❤️ Favoriten
              {favorites.length > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  tab === "favoriten"
                    ? "bg-white/30 text-white"
                    : "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300"
                }`}>
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Tab: Übungen */}
        {tab === "suche" && (
          <>
            {initError ? (
              <div className="text-center py-8">
                <p className="text-red-600 dark:text-red-400 font-semibold">
                  Körperbereiche konnten nicht geladen werden: {initError}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                  Prüfe deinen API-Key in{" "}
                  <code className="bg-gray-100 dark:bg-slate-700 dark:text-gray-300 px-1 rounded">.env.local</code>
                </p>
              </div>
            ) : bodyParts.length === 0 ? (
              <div className="text-center py-8 text-gray-400 dark:text-gray-500 animate-pulse">
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
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
                      {BODY_PART_DE[selected] ?? selected}
                    </h2>
                    {!loading && exercises.length > 0 && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0">
                        {filtered.length} / {exercises.length} Übungen
                      </span>
                    )}
                  </div>

                  {!loading && exercises.length > 0 && (
                    <div className="relative w-full sm:max-w-sm">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        🔍
                      </span>
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Name, Muskel oder Equipment…"
                        className="w-full pl-9 pr-8 py-2.5 text-sm border border-gray-200 dark:border-slate-600 rounded-full bg-white dark:bg-slate-800 dark:text-white dark:placeholder-gray-500 shadow-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-300"
                      />
                      {query && (
                        <button
                          onClick={() => setQuery("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {!loading && query && filtered.length === 0 && (
                  <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                    <p className="text-4xl mb-3">🔎</p>
                    <p>Keine Übungen für „{query}" gefunden.</p>
                  </div>
                )}

                <ExerciseGrid
                  exercises={filtered}
                  loading={loading}
                  error={error}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggle}
                />
              </section>
            )}

            {!selected && bodyParts.length > 0 && (
              <div className="text-center py-20 text-gray-400 dark:text-gray-500">
                <p className="text-6xl mb-4">🏋️</p>
                <p className="text-lg">Wähle einen Körperbereich oben aus</p>
              </div>
            )}
          </>
        )}

        {/* Tab: Favoriten */}
        {tab === "favoriten" && (
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Meine Favoriten
            </h2>
            {favorites.length === 0 ? (
              <div className="text-center py-20 text-gray-400 dark:text-gray-500">
                <p className="text-6xl mb-4">🤍</p>
                <p className="text-lg">Noch keine Favoriten gespeichert.</p>
                <p className="text-sm mt-2">Tippe auf das Herz einer Übung, um sie hier zu speichern.</p>
              </div>
            ) : (
              <ExerciseGrid
                exercises={favorites}
                loading={false}
                error={null}
                isFavorite={isFavorite}
                onToggleFavorite={toggle}
              />
            )}
          </section>
        )}
      </div>
    </main>
  );
}
