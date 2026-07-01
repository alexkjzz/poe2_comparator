<script lang="ts">
  import ItemCard from '../molecules/ItemCard.svelte';
  import Button from '../atoms/Button.svelte';

  interface Item {
    id: string;
    name: string;
    type: string;
    rarity: 'common' | 'magic' | 'rare' | 'unique';
    level: number;
    stats?: string[];
    imageUrl?: string;
  }

  interface Props {
    item1?: Item | null;
    item2?: Item | null;
    onSwap?: () => void;
  }

  let { item1, item2, onSwap }: Props = $props();

  const placeholderItem: Item = {
    id: 'placeholder',
    name: 'Empty Slot',
    type: 'No Item Selected',
    rarity: 'common',
    level: 0,
    stats: ['Paste item or search above'],
  };
</script>

<div>
  <div>
    <div>
      <div>Item 1</div>
      {#if item1}
        <ItemCard {...item1} />
      {:else}
        <ItemCard {...placeholderItem} />
      {/if}
    </div>

    <div>
      <Button onClick={onSwap}>SWAP</Button>
    </div>

    <div>
      <div>Item 2</div>
      {#if item2}
        <ItemCard {...item2} />
      {:else}
        <ItemCard {...placeholderItem} />
      {/if}
    </div>
  </div>

  {#if item1 && item2}
    <div>
      <div>
        <h3>Comparison</h3>
        <div>
          <div>
            <span>Rarity:</span>
            <span>{item1.rarity}</span> vs <span>{item2.rarity}</span>
          </div>
          <div>
            <span>Level:</span>
            <span>{item1.level}</span> vs <span>{item2.level}</span>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
