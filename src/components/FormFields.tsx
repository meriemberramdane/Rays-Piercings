import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";

interface FieldWrapProps {
  label: string;
  children: ReactNode;
  required?: boolean;
}

export function FieldWrap({ label, children, required }: FieldWrapProps) {
  return (
    <label className="block mb-5">
      <span className="block font-mono text-[10px] uppercase tracking-widest2 text-bone-faint mb-2">
        {label} {required && <span className="text-silver">*</span>}
      </span>
      {children}
    </label>
  );
}

const baseClasses =
  "w-full rounded-xl bg-ink-soft border border-white/10 px-4 py-3 text-sm text-white placeholder:text-bone-faint focus:border-silver/50 focus:outline-none transition-colors";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={baseClasses} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${baseClasses} resize-none`} rows={3} />;
}

export function SelectInput(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`${baseClasses} appearance-none cursor-pointer`}>
      {props.children}
    </select>
  );
}
