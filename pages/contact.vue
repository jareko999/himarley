<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const description = ref('')

const submitting = ref(false)
const success = ref(false)

const submitForm = async () => {
  submitting.value = true
  success.value = false

  try {
    const res = await fetch('/api/mailersend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        name: name.value,
        description: description.value
      })
    })

    if (res.ok) {
      success.value = true
      name.value = ''
      email.value = ''
      description.value = ''
    }
  } catch (e) {
    console.error(e)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="min-h-screen w-full flex justify-center items-center px-4">
    <form @submit.prevent="submitForm" class="max-w-md w-full space-y-4 bg-white">
      <h1>Contact us</h1>
      <input v-model="name" type="text" placeholder="Name" class="w-full border p-2 rounded" required />
      <input v-model="email" type="email" placeholder="Email" class="w-full border p-2 rounded" required />
      <textarea v-model="description" placeholder="Enter your message" class="w-full border p-2 rounded" rows="4" required />
      <button :disabled="submitting" type="submit" class="w-full bg-black text-white py-2 rounded hover:opacity-90">
        {{ submitting ? 'Sending...' : 'Send Message' }}
      </button>
      <p v-if="success" class="text-green-600">Thanks! We'll be in touch.</p>
    </form>
  </main>
</template>
