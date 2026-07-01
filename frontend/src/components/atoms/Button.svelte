<script lang="ts">
  interface Props {
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit' | 'reset';
    className?: string;
  }

  const variantClasses: Record<NonNullable<Props['variant']>, string> = {
    primary: 'bg-primary text-primary-foreground hover:opacity-90',
    secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
    danger: 'bg-destructive text-destructive-foreground hover:opacity-90'
  };

  const sizeClasses: Record<NonNullable<Props['size']>, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-5 py-3 text-lg'
  };

  let {
    onClick,
    disabled = false,
    variant = 'primary',
    size = 'md',
    type = 'button',
    className = '',
    children
  }: Props & { children: any } = $props();
</script>

<button
  {type}
  {disabled}
  class={`rounded transition ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`.trim()}
  onclick={onClick}
>
  {@render children?.()}
</button>
