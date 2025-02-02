/**
 * MessageLevels
 */
export enum MessageLevel {
  ERROR = 'Error',
  INFO = 'Info',
  WARNING = 'Warning',
  DEBUG = 'Debug',
}

/**
 * Message
 *
 * Nostly to handle error messaging in one way for this project
 */
export class Message {
  text: string
  level: MessageLevel

  constructor(text: string, level: MessageLevel) {
    this.text = text
    this.level = level
  }
}
