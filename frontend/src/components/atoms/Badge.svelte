<script lang="ts">
  interface Props {
    rarity?: 'common' | 'magic' | 'rare' | 'unique' | 'currency';
  }

  let { rarity = 'common', children }: Props & { children: any } = $props();
</script>

<span>
  {@render children?.()}
</span>
