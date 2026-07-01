<script lang="ts">
  interface Props {
    title?: string;
    description?: string;
  }

  let {
    title = 'Item Comparator',
    description = 'Compare items to make informed decisions about your gear.'
  }: Props = $props();
</script>

<div class="mb-8">
  <h1 class="text-4xl font-bold text-foreground mb-2">{title}</h1>
  <p class="text-muted-foreground">{description}</p>
</div>
