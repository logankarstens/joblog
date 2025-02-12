import { useMemo, useRef, useState } from 'react';
import statusOptions from "@/data/statusOptions";
import { useClickOutside } from '@/hooks/useClickOutside';

export default function StatusDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const status = useMemo(() => statusOptions.find(s => s.label == value) || null, [value]);

  const setStatus = (statusOption) => {
    onChange(statusOption.label);
    setOpen(o => !o);
  }

  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false), open);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="px-2 font-semibold rounded-sm" 
        style={{backgroundColor: status?.color?.background, color: status?.color?.text}}
      >
        {status?.label ?? "None"}
        &nbsp;
        v
      </button>    
      {open && <div className="absolute p-2 bg-slate-600 rounded-sm shadow-lg flex flex-col gap-1">
        {statusOptions.map(option => (
          <button
            key={option.label}
            onClick={() => setStatus(option)}
            className="px-2 font-semibold rounded-sm whitespace-nowrap"
            style={{backgroundColor: option.color.background, color: option.color.text}}
          >
            {option.label}
          </button>
        ))}
      </div>}
    </div>
  );
}