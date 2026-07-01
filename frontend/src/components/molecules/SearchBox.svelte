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
    onChange={handleSearch}
    type="search"
  />
</div>
