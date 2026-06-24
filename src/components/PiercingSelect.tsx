import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

interface Props {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export function PiercingSelect({
  value,
  options,
  onChange,
}: Props) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="w-full rounded-xl bg-ink-soft border border-white/10 px-4 py-3 text-left text-white flex items-center justify-between hover:border-silver/40 transition-all">
          <span>{value}</span>
          <ChevronDown size={18} />
        </Listbox.Button>

        <Listbox.Options className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl">
          {options.map((option) => (
            <Listbox.Option
              key={option}
              value={option}
              className={({ active }) =>
                `cursor-pointer px-4 py-3 transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-bone-dim"
                }`
              }
            >
              {option}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}