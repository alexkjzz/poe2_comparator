<script lang="ts">
  import Input from '../atoms/Input.svelte';

  interface Props {
    onSearch?: (query: string) => void;
    placeholder?: string;
  }

  let { onSearch, placeholder = 'Search items...' }: Props = $props();
  let query = $state('');

  function handleSearch(value: string) {
    query = value;
    onSearch?.(value);
  }
</script>

<div>
  <Input
    placeholder={placeholder}
    value={query}
    onInput={handleSearch}
    type="search"
    className="w-full bg-input border border-border rounded px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
  />
</div>
