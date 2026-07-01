<script lang="ts">
  import Button from '../atoms/Button.svelte';

  interface Props {
    onSwap?: () => void;
    onClear?: () => void;
    swapLabel?: string;
    clearLabel?: string;
  }

  let { onSwap, onClear, swapLabel = 'Swap Items', clearLabel = 'Clear All' }: Props = $props();
</script>

<div class="flex gap-3">
  <Button onClick={onSwap} variant="primary">{swapLabel}</Button>
  <Button onClick={onClear} variant="secondary">{clearLabel}</Button>
</div>
