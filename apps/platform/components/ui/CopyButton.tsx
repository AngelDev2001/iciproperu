import * as React from 'react';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
    value: string;
    className?: string;
}

export function CopyButton({ value, className }: CopyButtonProps) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!value) return;

        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className={cn(
                "ml-1 p-0.5 rounded-md hover:bg-muted transition-colors inline-flex items-center justify-center",
                className
            )}
        >
            {copied ? (
                <IconCheck size={12} className="text-green-600 animate-in zoom-in" />
            ) : (
                <IconCopy size={12} className="text-muted-foreground/50 hover:text-foreground" />
            )}
        </button>
    );
}