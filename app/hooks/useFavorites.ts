"use client";

import { useEffect, useState } from "react";
import { Exercise } from "../types/exercise";

const STORAGE_KEY = "exercise-favorites";

function load(): Exercise[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Exercise[]>([]);

  useEffect(() => {
    setFavorites(load());
  }, []);

  function toggle(exercise: Exercise) {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === exercise.id);
      const next = exists
        ? prev.filter((f) => f.id !== exercise.id)
        : [...prev, exercise];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function isFavorite(id: string) {
    return favorites.some((f) => f.id === id);
  }

  return { favorites, toggle, isFavorite };
}
