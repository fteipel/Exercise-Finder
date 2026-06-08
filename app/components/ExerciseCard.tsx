"use client";

import { useState } from "react";
import { Exercise } from "../types/exercise";

interface Props {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden">
      <div className="relative bg-gray-50 flex items-center justify-center h-48">
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          className="h-48 w-auto object-contain"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 capitalize text-base leading-tight mb-3">
          {exercise.name}
        </h3>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium capitalize">
            {exercise.target}
          </span>
          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium capitalize">
            {exercise.equipment}
          </span>
        </div>

        {exercise.secondaryMuscles.length > 0 && (
          <p className="text-xs text-gray-500 mb-3">
            <span className="font-semibold">Zusätzlich:</span>{" "}
            {exercise.secondaryMuscles.join(", ")}
          </p>
        )}

        {exercise.instructions.length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium underline"
          >
            {expanded ? "Anleitung ausblenden ▲" : "Anleitung anzeigen ▼"}
          </button>
        )}

        {expanded && (
          <ol className="mt-3 space-y-1 list-decimal list-inside text-xs text-gray-600">
            {exercise.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
