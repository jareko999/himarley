<script setup>
const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  to: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['click']);

function handleClick(event) {
  if (!props.to) {
    emit('click', event);
  }
}
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="button"
  >
    <slot name="left-icon" />
    {{ text }}
    <slot />
    <slot name="right-icon" />
  </NuxtLink>
  <button
    v-else
    class="button"
    @click="handleClick"
  >
    <slot name="left-icon" />
    {{ text }}
    <slot />
    <slot name="right-icon" />
  </button>
</template>
