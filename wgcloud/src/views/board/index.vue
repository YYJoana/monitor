<template>
  <div class="grid-container">
    <div class="dv-border-box12" style="grid-area: 1/2/2/4">21</div>
    <div class="empty-box" style="grid-area: 1/1">12</div>
    <div class="empty-box" style="grid-area: 1/4">21</div>
    <div class="empty-box" style="grid-area: 3/1">12</div>
    <div class="empty-box" style="grid-area: 3/4">12</div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 100px);
  grid-gap: 10px;
}

.dv-border-box12 {
  grid-column: 2 / span 2;
  grid-row: 1 / 2;
}
</style>
