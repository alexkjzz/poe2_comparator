<script lang="ts">
  import SearchBox from './SearchBox.svelte';

  interface Props {
    onSearch?: (query: string) => void;
  }

  let { onSearch }: Props = $props();
</script>

<div class="bg-card border border-border rounded-lg p-6 mb-6">
  <SearchBox placeholder="Paste or search item..." onSearch={onSearch} />
</div>
