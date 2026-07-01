<section class="p-8">
  <div class="max-w-6xl">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-foreground mb-2">Item Comparator</h1>
      <p class="text-muted-foreground">Compare items to make informed decisions about your gear.</p>
    </div>

    <!-- Search Section -->
    <div class="bg-card border border-border rounded-lg p-6 mb-6">
      <input
        type="text"
        placeholder="Paste or search item..."
        class="w-full bg-input border border-border rounded px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
      />
    </div>

    <!-- Comparison Grid -->
    <div class="grid grid-cols-2 gap-6 mb-6">
      <!-- Item 1 -->
      <div class="bg-card border border-border rounded-lg p-6 min-h-96">
        <h2 class="text-sm font-semibold text-muted-foreground uppercase mb-4">Item 1</h2>
        <div class="flex items-center justify-center h-full text-muted-foreground">
          No item selected
        </div>
      </div>

      <!-- Item 2 -->
      <div class="bg-card border border-border rounded-lg p-6 min-h-96">
        <h2 class="text-sm font-semibold text-muted-foreground uppercase mb-4">Item 2</h2>
        <div class="flex items-center justify-center h-full text-muted-foreground">
          No item selected
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-3">
      <button class="bg-primary hover:opacity-90 text-primary-foreground px-4 py-2 rounded transition">
        Swap Items
      </button>
      <button class="bg-secondary hover:opacity-90 text-secondary-foreground px-4 py-2 rounded transition">
        Clear All
      </button>
    </div>
  </div>
</section>
