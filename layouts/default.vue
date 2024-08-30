<template>
  <div class="flex">
    <SideNav />
    <div class="w-full max-h-screen overflow-y-scroll">
      <slot />
    </div>
  </div>
  <UNotifications />
  <UModals />
  <USlideovers />
</template>

<script></script>
