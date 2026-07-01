<script lang="ts">
  interface Props {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    type?: 'text' | 'number' | 'search';
  }

  let { label, placeholder = '', value = '', onChange, type = 'text' }: Props = $props();
  let inputId = Math.random().toString(36).substring(7);
</script>

<div>
  {#if label}
    <label for={inputId}>{label}</label>
  {/if}
  <input
    id={inputId}
    {type}
    {placeholder}
    bind:value
    onchange={(e) => onChange?.(e.currentTarget.value)}
  />
</div>
