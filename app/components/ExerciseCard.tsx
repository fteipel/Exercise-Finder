"use client";

import { useState } from "react";
import { Exercise } from "../types/exercise";

const TARGET_ICONS: Record<string, string> = {
  abs: "🤸",
  abductors: "🦵",
  adductors: "🦵",
  biceps: "💪",
  calves: "🦵",
  "cardiovascular system": "❤️",
  delts: "🏋️",
  forearms: "🦾",
  glutes: "🍑",
  hamstrings: "🦵",
  lats: "🏊",
  "levator scapulae": "🦅",
  pectorals: "🫁",
  quads: "🦵",
  "serratus anterior": "🥊",
  spine: "🦴",
  "traps (upper)": "🏋️",
  traps: "🏋️",
  triceps: "🤜",
  "upper back": "🦅",
};

const EQUIPMENT_COLORS: Record<string, string> = {
  barbell: "from-orange-400 to-amber-500",
  dumbbell: "from-blue-400 to-indigo-500",
  "body weight": "from-emerald-400 to-teal-500",
  cable: "from-violet-400 to-purple-500",
  machine: "from-slate-400 to-gray-500",
  "leverage machine": "from-slate-400 to-gray-500",
  "resistance band": "from-pink-400 to-rose-500",
  kettlebell: "from-yellow-400 to-orange-500",
  "ez barbell": "from-orange-400 to-red-500",
  weighted: "from-cyan-400 to-blue-500",
};

function getGradient(equipment: string): string {
  return EQUIPMENT_COLORS[equipment.toLowerCase()] ?? "from-indigo-400 to-blue-500";
}

interface Props {
  exercise: Exercise;
  isFavorite: boolean;
  onToggleFavorite: (exercise: Exercise) => void;
}

export default function ExerciseCard({ exercise, isFavorite, onToggleFavorite }: Props) {
  const [expanded, setExpanded] = useState(false);
  const icon = TARGET_ICONS[exercise.target.toLowerCase()] ?? "🏋️";
  const gradient = getGradient(exercise.equipment);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden hover:-translate-y-0.5">
      <div className={`relative bg-gradient-to-br ${gradient} h-36 flex flex-col items-center justify-center gap-2`}>
        <span className="text-5xl drop-shadow">{icon}</span>
        <span className="text-white/90 text-xs font-semibold uppercase tracking-widest">
          {exercise.target}
        </span>
        <button
          onClick={() => onToggleFavorite(exercise)}
          aria-label={isFavorite ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}
          className="absolute top-2 right-2 w-9 h-9 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 transition-colors"
        >
          <span className="text-lg">{isFavorite ? "❤️" : "🤍"}</span>
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 dark:text-white capitalize text-sm leading-tight mb-3">
          {exercise.name}
        </h3>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs rounded-full font-medium capitalize">
            {exercise.target}
          </span>
          <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs rounded-full font-medium capitalize">
            {exercise.equipment}
          </span>
          {exercise.difficulty && (
            <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 text-xs rounded-full font-medium capitalize">
              {exercise.difficulty}
            </span>
          )}
        </div>

        {exercise.secondaryMuscles.length > 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            <span className="font-semibold">Zusätzlich:</span>{" "}
            {exercise.secondaryMuscles.join(", ")}
          </p>
        )}

        {exercise.instructions.length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 font-medium underline"
          >
            {expanded ? "Anleitung ausblenden ▲" : "Anleitung anzeigen ▼"}
          </button>
        )}

        {expanded && (
          <ol className="mt-3 space-y-1 list-decimal list-inside text-xs text-gray-600 dark:text-gray-400">
            {exercise.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
