<script lang="ts">
  interface Props {
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
  }

  let { onClick, disabled = false, variant = 'primary', size = 'md', children }: Props & { children: any } = $props();
</script>

<button {disabled} onmousedown={onClick}>
  {@render children?.()}
</button>
