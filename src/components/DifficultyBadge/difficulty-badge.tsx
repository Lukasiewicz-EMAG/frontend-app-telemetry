import { cn } from "@/lib/utils"
import { DifficultyIcon } from "./difficulty-icon"

interface DifficultyBadgeProps {
    level: 1 | 2 | 3 | 4 | 5
    className?: string
}

const DIFFICULTY_LABELS = {
    1: "Rozgrzewkowe",
    2: "Łatwe",
    3: "Średnie",
    4: "Trudne",
    5: "Koszmar"
} as const

const DIFFICULTY_STYLES = {
    1: "text-emerald-600 border-emerald-300",
    2: "text-green-600 border-green-300",
    3: "text-violet-600 border-violet-300",
    4: "text-red-600 border-red-300",
    5: "text-rose-600 border-rose-300"
} as const

export function DifficultyBadge({ level, className }: DifficultyBadgeProps) {
    const iconLevel: 1 | 2 | 3 = level <= 2 ? 1 : level === 3 ? 2 : level <= 5 ? 3 : 1;

    return (
        <div
            className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 h-full font-medium bg-white",
                "font-feature-settings-normal font-variation-settings-normal text-[14px]",
                DIFFICULTY_STYLES[level],
                className
            )}
        >
            <DifficultyIcon level={iconLevel} className="h-4 w-4" />
            {DIFFICULTY_LABELS[level]}
        </div>
    )
}
