import { clsx } from 'clsx';

const variants = {
    primary: 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-primary-500/30 hover:-translate-y-0.5',
    outline: 'bg-transparent border-[1.5px] border-white/15 text-white hover:border-primary-500 hover:text-primary-400 hover:bg-primary-500/5 hover:-translate-y-0.5',
    ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5',
    danger: 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:-translate-y-0.5',
    success: 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:-translate-y-0.5',
    accent: 'bg-gradient-to-br from-primary-500 to-accent-dark text-white shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5',
};

const sizes = {
    xs: 'px-2.5 py-1 text-[0.72rem] rounded-lg gap-1',
    sm: 'px-3.5 py-1.5 text-[0.78rem] rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-[0.85rem] rounded-xl gap-2',
    lg: 'px-7 py-3 text-[0.92rem] rounded-xl gap-2.5',
    xl: 'px-8 py-3.5 text-base rounded-2xl gap-3',
};

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconRight: IconRight,
    className = '',
    loading = false,
    disabled = false,
    ...props
}) {
    return (
        <button
            className={clsx(
                'inline-flex items-center justify-center font-semibold font-heading',
                'transition-all duration-300 ease-out cursor-pointer',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
                'relative overflow-hidden',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            ) : Icon ? (
                <Icon size={size === 'xs' ? 12 : size === 'sm' ? 14 : 16} />
            ) : null}
            {children}
            {IconRight && !loading && <IconRight size={size === 'xs' ? 12 : size === 'sm' ? 14 : 16} />}
        </button>
    );
}
