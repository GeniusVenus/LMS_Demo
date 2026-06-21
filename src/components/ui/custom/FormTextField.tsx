import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormTextFieldProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

/**
 * Label + input + error message in one piece. Prefer this over hand-rolled
 * input markup in feature forms so spacing and error styling stay consistent.
 */
export function FormTextField({
  label,
  error,
  id,
  containerClassName,
  className,
  ...props
}: FormTextFieldProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  return (
    <div className={cn('flex flex-col gap-1.5', containerClassName)}>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <Input id={inputId} aria-invalid={!!error} className={className} {...props} />
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
