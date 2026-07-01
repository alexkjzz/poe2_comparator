<script lang="ts">
  import ItemCard from './ItemCard.svelte';
  import type { Item } from '../../stores/items';

  interface Props {
    item1?: Item | null;
    item2?: Item | null;
    emptySlot1: Item;
    emptySlot2: Item;
  }

  let { item1, item2, emptySlot1, emptySlot2 }: Props = $props();
</script>

<div class="grid grid-cols-2 gap-6 mb-6">
  <div class="bg-card border border-border rounded-lg p-6 min-h-96">
    <h2 class="text-sm font-semibold text-muted-foreground uppercase mb-4">Item 1</h2>
    <ItemCard {...(item1 ?? emptySlot1)} />
  </div>

  <div class="bg-card border border-border rounded-lg p-6 min-h-96">
    <h2 class="text-sm font-semibold text-muted-foreground uppercase mb-4">Item 2</h2>
    <ItemCard {...(item2 ?? emptySlot2)} />
  </div>
</div>
