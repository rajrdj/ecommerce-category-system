// components/ui/select.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  placeholder?: string;
}

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

interface SelectContentProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

interface SelectItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children: React.ReactNode;
}

export function Select({ value, onValueChange, children }: SelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          if (child.type === SelectTrigger) {
            return React.cloneElement(child, {
              onClick: () => setOpen(!open),
            });
          }
          if (child.type === SelectContent) {
            return React.cloneElement(child, {
              open,
              onClose: () => setOpen(false),
              value,
              onValueChange,
            });
          }
        }
        return child;
      })}
    </div>
  );
}

export function SelectTrigger({ children, className = "", ...props }: SelectTriggerProps) {
  return (
    <button
      type="button"
      className={`flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
}

export function SelectContent({ children, open, onClose }: SelectContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
    >
      <div className="p-1">{children}</div>
    </div>
  );
}

export function SelectItem({ value, children, onClick, className = "", ...props }: SelectItemProps) {
  return (
    <button
      type="button"
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export function SelectValue({ children }: { children: React.ReactNode }) {
  return <span className="text-sm">{children}</span>;
}

// components/ui/alert.tsx
import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const alertVariants = {
  default: "bg-background text-foreground",
  destructive: "bg-destructive/15 text-destructive dark:bg-destructive/20"
};

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof alertVariants;
}

export function Alert({ className = "", variant = "default", ...props }: AlertProps) {
  const Icon = variant === "destructive" ? AlertCircle : CheckCircle2;
  
  return (
    <div
      role="alert"
      className={`relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11 ${alertVariants[variant]} ${className}`}
      {...props}
    >
      <Icon className="h-5 w-5" />
      {props.children}
    </div>
  );
}

export function AlertDescription({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      className={`text-sm [&_p]:leading-relaxed ${className}`}
      {...props}
    />
  );
}