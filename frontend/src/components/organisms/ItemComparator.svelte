<script lang="ts">
  import ComparatorHeader from '../molecules/ComparatorHeader.svelte';
  import ComparatorSearchPanel from '../molecules/ComparatorSearchPanel.svelte';
  import ComparisonGrid from '../molecules/ComparisonGrid.svelte';
  import ComparatorActions from '../molecules/ComparatorActions.svelte';
  import { useComparator } from '../../lib/comparator.logic';
  import type { Item } from '../../stores/items';

  const { selectedItem1, selectedItem2, swap, clear, setItemsFromQuery } = useComparator();

  const emptySlot1: Item = {
    id: 'slot-1-empty',
    name: 'Empty Slot',
    type: 'No Item Selected',
    rarity: 'common',
    level: 0,
    stats: ['Paste item or search above']
  };

  const emptySlot2: Item = {
    id: 'slot-2-empty',
    name: 'Empty Slot',
    type: 'No Item Selected',
    rarity: 'common',
    level: 0,
    stats: ['Paste item or search above']
  };
</script>

<section class="p-8">
  <div class="max-w-6xl">
    <ComparatorHeader />
    <ComparatorSearchPanel onSearch={setItemsFromQuery} />
    <ComparisonGrid item1={$selectedItem1} item2={$selectedItem2} {emptySlot1} {emptySlot2} />
    <ComparatorActions onSwap={swap} onClear={clear} />
  </div>
</section>
