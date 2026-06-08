"use client";

const BODY_PART_ICONS: Record<string, string> = {
  back: "🔙",
  cardio: "❤️",
  chest: "💪",
  "lower arms": "🦾",
  "lower legs": "🦵",
  neck: "🫀",
  shoulders: "🏋️",
  "upper arms": "💪",
  "upper legs": "🦵",
  waist: "⭕",
};

interface Props {
  bodyParts: string[];
  selected: string | null;
  onSelect: (part: string) => void;
}

export default function BodyPartSelector({ bodyParts, selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {bodyParts.map((part) => {
        const isSelected = selected === part;
        return (
          <button
            key={part}
            onClick={() => onSelect(part)}
            className={`flex items-center gap-2 px-5 py-3 rounded-full border-2 font-semibold transition-all duration-200 capitalize text-sm
              ${
                isSelected
                  ? "bg-indigo-600 border-indigo-600 text-white shadow-lg scale-105"
                  : "bg-white border-gray-200 text-gray-700 hover:border-indigo-400 hover:text-indigo-600 hover:shadow-md"
              }`}
          >
            <span>{BODY_PART_ICONS[part] ?? "🏃"}</span>
            {part}
          </button>
        );
      })}
    </div>
  );
}
