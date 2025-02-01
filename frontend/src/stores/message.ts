import { Message, MessageLevel } from '@/models/message'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const getMessageStore = defineStore('message', () => {
  const messages = ref<Message[]>([])

  function addMessage(text: string, level: MessageLevel) {
    messages.value.push(new Message(text, level))

    // until a message display is implemented, this is the solution
    if (level === MessageLevel.ERROR) {
      alert(level.toString() + ': ' + text)
    }
  }

  function addDebug(text: string) {
    addMessage(text, MessageLevel.DEBUG)
  }

  function addInfo(text: string) {
    addMessage(text, MessageLevel.INFO)
  }

  function addWarning(text: string) {
    addMessage(text, MessageLevel.WARNING)
  }

  function addError(text: string) {
    addMessage(text, MessageLevel.ERROR)
  }

  function handleError(error: any) {
    if (error instanceof Error) {
      console.error(error)
      addError(error.message)
    } else {
      throw error
    }
  }

  return { addMessage, addDebug, addInfo, addWarning, addError, handleError }
})
