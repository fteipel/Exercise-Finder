"use client";

const BODY_PART_ICONS: Record<string, string> = {
  back: "🏊",
  cardio: "❤️",
  chest: "🫁",
  "lower arms": "🦾",
  "lower legs": "🦵",
  neck: "💆",
  shoulders: "🏋️",
  "upper arms": "💪",
  "upper legs": "🦵",
  waist: "🤸",
};

export const BODY_PART_DE: Record<string, string> = {
  back: "Rücken",
  cardio: "Cardio",
  chest: "Brust",
  "lower arms": "Unterarme",
  "lower legs": "Unterschenkel",
  neck: "Nacken",
  shoulders: "Schultern",
  "upper arms": "Oberarme",
  "upper legs": "Oberschenkel",
  waist: "Bauch",
};

interface Props {
  bodyParts: string[];
  selected: string | null;
  onSelect: (part: string) => void;
}

export default function BodyPartSelector({ bodyParts, selected, onSelect }: Props) {
  return (
    <div className="flex overflow-x-auto pb-2 gap-2 sm:flex-wrap sm:justify-center sm:gap-3 sm:overflow-visible sm:pb-0 scrollbar-hide">
      {bodyParts.map((part) => {
        const isSelected = selected === part;
        return (
          <button
            key={part}
            onClick={() => onSelect(part)}
            className={`flex items-center gap-2 px-4 py-3 min-h-[44px] shrink-0 rounded-full border-2 font-semibold transition-all duration-200 text-sm
              ${
                isSelected
                  ? "bg-indigo-600 border-indigo-600 text-white shadow-lg scale-105"
                  : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-400 hover:shadow-md"
              }`}
          >
            <span>{BODY_PART_ICONS[part] ?? "🏃"}</span>
            {BODY_PART_DE[part] ?? part}
          </button>
        );
      })}
    </div>
  );
}
