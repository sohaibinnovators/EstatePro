import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || props.name;

  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-navy"
        >
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={cn(
          "h-11 w-full rounded-md border border-border bg-white px-3.5 text-sm text-navy outline-none transition-colors placeholder:text-muted/70 focus:border-gold focus:ring-2 focus:ring-gold/20",
          error && "border-red-400 focus:border-red-400 focus:ring-red-200",
          className,
        )}
        {...props}
      />
      {error ? <p className="mt-1.5 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
