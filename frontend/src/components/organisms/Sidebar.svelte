<script lang="ts">
  let expanded = $state({
    tools: true,
    settings: false,
  });

  function toggleExpand(section: string) {
    expanded[section as keyof typeof expanded] = !expanded[section as keyof typeof expanded];
  }
</script>

<aside class="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen overflow-hidden">
  <!-- Header -->
  <a href="/" class="p-4 border-b border-sidebar-border shrink-0 hover:bg-sidebar-accent transition">
    <h2 class="text-sm font-semibold text-sidebar-foreground uppercase tracking-wider">POE2 Tools</h2>
  </a>

  <!-- Sidebar Items -->
  <nav class="flex-1 overflow-y-auto">
    <!-- Tools Section -->
    <div class="border-b border-sidebar-border">
      <button
        onclick={() => toggleExpand('tools')}
        class="w-full flex items-center gap-2 px-4 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition"
      >
        <span class={`transition-transform ${expanded.tools ? 'rotate-90' : ''}`}>▶</span>
        <span>Tools</span>
      </button>

      {#if expanded.tools}
        <div class="bg-sidebar-accent/50">
          <a href="/comparator" class="block px-8 py-2 text-sm text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent">
            Item Comparator
          </a>
        </div>
      {/if}
    </div>

    <!-- Settings Section -->
    <div class="border-b border-sidebar-border">
      <button
        onclick={() => toggleExpand('settings')}
        class="w-full flex items-center gap-2 px-4 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition"
      >
        <span class={`transition-transform ${expanded.settings ? 'rotate-90' : ''}`}>▶</span>
        <span>Settings</span>
      </button>

      {#if expanded.settings}
        <div class="bg-sidebar-accent/50">
          <a href="/" class="block px-8 py-2 text-sm text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent">
            General
          </a>
          <a href="/" class="block px-8 py-2 text-sm text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent">
            Shortcuts
          </a>
        </div>
      {/if}
    </div>
  </nav>
</aside>
