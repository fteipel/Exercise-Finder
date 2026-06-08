"use client";

import { Exercise } from "../types/exercise";
import ExerciseCard from "./ExerciseCard";

interface Props {
  exercises: Exercise[];
  loading: boolean;
  error: string | null;
}

export default function ExerciseGrid({ exercises, loading, error }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded-full w-20" />
                <div className="h-6 bg-gray-200 rounded-full w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-4">⚠️</p>
        <p className="text-red-600 font-semibold">{error}</p>
        <p className="text-gray-500 text-sm mt-2">
          Prüfe deinen API-Key in <code className="bg-gray-100 px-1 rounded">.env.local</code>
        </p>
      </div>
    );
  }

  if (exercises.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}
