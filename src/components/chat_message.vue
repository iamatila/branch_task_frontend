<template>
  <div>
    {{ data }}
    <div
      v-for="(message, index) in data.messages"
      :key="index"
      class="mt-2"
      :class="{ 'text-right justify-end': message.type === 'self' }"
    >
      <div class="text-sm">{{ message.username }}</div>
      <div>
        <div
          class="px-4 py-1 rounded-md inline-block mt-1"
          :class="{
            'bg-blue text-white': message.type === 'self',
            'bg-grey text-dark-secondary': message.type !== 'self'
          }"
        >
          {{ message.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import the 'defineProps' function from 'vue'
import { defineProps } from 'vue'

// Define the props
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})
</script>

