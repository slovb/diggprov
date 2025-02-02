import { Message, MessageLevel } from '@/models/message'
import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * MessageStore
 *
 * Mostly to handle error messages as alerts for this app as I did not make a message component
 *
 * Choices:
 * 1. Making this store:
 *    I got in the mindset of what I need for a less simple app and I know I need a messaging system.
 *    That said, for this sample it is not really needed and only the handleError function is actually
 *    used.
 */
export const getMessageStore = defineStore('message', () => {
  const messages = ref<Message[]>([])

  /**
   * Add a message to the list of messages
   *
   * @param text
   * @param level
   */
  function addMessage(text: string, level: MessageLevel) {
    messages.value.push(new Message(text, level))

    // until a message display is implemented, this is the solution
    if (level === MessageLevel.ERROR) {
      alert(level.toString() + ': ' + text)
    }
  }

  /**
   * Add a DEBUG message
   *
   * @param text
   */
  function addDebug(text: string) {
    addMessage(text, MessageLevel.DEBUG)
  }

  /**
   * Add an INFO message
   *
   * @param text
   */
  function addInfo(text: string) {
    addMessage(text, MessageLevel.INFO)
  }

  /**
   * Add a WARNING message
   *
   * @param text
   */
  function addWarning(text: string) {
    addMessage(text, MessageLevel.WARNING)
  }

  /**
   * Add an ERROR message
   *
   * @param text
   */
  function addError(text: string) {
    addMessage(text, MessageLevel.ERROR)
  }

  /**
   * Handle caught errors in the same way at every spot
   *
   * @param error
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleError(error: any) {
    // TODO: Reconsider disabling linting of this any by developing a neater solution
    if (error instanceof Error) {
      console.error(error)
      addError(error.message)
    } else {
      throw error
    }
  }

  return { addMessage, addDebug, addInfo, addWarning, addError, handleError }
})
