<script lang="ts">
  import Badge from '../atoms/Badge.svelte';

  interface ItemProps {
    name: string;
    type: string;
    rarity: 'common' | 'magic' | 'rare' | 'unique';
    level: number;
    stats?: string[];
    imageUrl?: string;
  }

  let { name, type, rarity, level, stats = [], imageUrl }: ItemProps = $props();
</script>

<div>
  {#if imageUrl}
    <div>
      <img src={imageUrl} alt={name} />
    </div>
  {/if}

  <div>
    <div>
      <h3>{name}</h3>
      <Badge {rarity}>{rarity}</Badge>
    </div>

    <p>{type}</p>
    <p>Lvl: {level}</p>

    {#if stats.length > 0}
      <div>
        {#each stats as stat}
          <div>{stat}</div>
        {/each}
      </div>
    {/if}
  </div>
</div>
