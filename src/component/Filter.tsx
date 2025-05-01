import type { FilterOptionProps } from "../lib/types/Types.ts";

function Filter({ title, options, selected, onSelect, isCategory }: FilterOptionProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <h4 className="text-xl text-primary-200">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = isCategory
            ? selected.includes(option as any)
            : (selected[0] as any).label === (option as any).label;

          return (
            <button
              key={isCategory ? option as string : (option as any).label}
              onClick={() => onSelect(option)}
              className={`px-2 py-1 text-xs rounded-full tracking-wide ${isSelected ? "bg-primary-500/60 text-white" : "bg-primary-500 text-primary-200 hover:bg-primary-600"}`}
            >
              {isCategory ? option as string : (option as any).label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Filter;
