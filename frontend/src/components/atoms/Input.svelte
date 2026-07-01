<script lang="ts">
  interface Props {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onInput?: (value: string) => void;
    type?: 'text' | 'number' | 'search';
    id?: string;
    disabled?: boolean;
    className?: string;
  }

  let {
    label,
    placeholder = '',
    value = '',
    onChange,
    onInput,
    type = 'text',
    id,
    disabled = false,
    className = ''
  }: Props = $props();
  const generatedId = Math.random().toString(36).substring(7);
</script>

<div>
  {#if label}
    <label for={id ?? generatedId}>{label}</label>
  {/if}
  <input
    id={id ?? generatedId}
    {type}
    {placeholder}
    {disabled}
    class={className}
    bind:value
    oninput={(e) => onInput?.(e.currentTarget.value)}
    onchange={(e) => onChange?.(e.currentTarget.value)}
  />
</div>
