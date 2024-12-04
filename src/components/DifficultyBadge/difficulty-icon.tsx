interface DifficultyIconProps {
    level: 1 | 2 | 3
    className?: string
}

export function DifficultyIcon({ level, className }: DifficultyIconProps) {
    return (
        <svg
            className={className}
            width="24"
            height="20"
            viewBox="0 0 20 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="3"
                y="12"
                width="4"
                height="8"
                rx="2"
                fill={level >= 1 ? "currentColor" : "white"}
                stroke={"currentColor"}
                strokeWidth={1}
            />
            <rect
                x="10"
                y="8"
                width="4"
                height="12"
                rx="2"
                fill={level >= 2 ? "currentColor" : "white"}
                stroke={"currentColor"}
                strokeWidth={1}
            />
            <rect
                x="17"
                y="4"
                width="4"
                height="16"
                rx="2"
                fill={level >= 3 ? "currentColor" : "white"}
                stroke={"currentColor"}
                strokeWidth={1}
            />
        </svg>
    )
}
