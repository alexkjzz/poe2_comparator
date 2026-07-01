<script lang="ts">
  import '../styles/tailwind.css';
  import Sidebar from '../components/organisms/Sidebar.svelte';
</script>

<div class="flex h-screen w-screen bg-background text-foreground overflow-hidden">
  <Sidebar />
  
  <main class="flex-1 flex flex-col overflow-hidden">
    <div class="flex-1 overflow-auto">
      <slot />
    </div>
  </main>
</div>
