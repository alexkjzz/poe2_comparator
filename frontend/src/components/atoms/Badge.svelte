<script lang="ts">
  interface Props {
    rarity?: 'common' | 'magic' | 'rare' | 'unique' | 'currency';
    className?: string;
  }

  const rarityClasses: Record<NonNullable<Props['rarity']>, string> = {
    common: 'bg-muted text-foreground',
    magic: 'bg-blue-500/20 text-blue-300',
    rare: 'bg-yellow-500/20 text-yellow-300',
    unique: 'bg-orange-500/20 text-orange-300',
    currency: 'bg-emerald-500/20 text-emerald-300'
  };

  let { rarity = 'common', className = '', children }: Props & { children: any } = $props();
</script>

<span class={`inline-flex rounded px-2 py-0.5 text-xs font-medium uppercase ${rarityClasses[rarity]} ${className}`.trim()}>
  {@render children?.()}
</span>
