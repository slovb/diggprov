export enum MessageLevel {
  ERROR = 'Error',
  INFO = 'Info',
  WARNING = 'Warning',
  DEBUG = 'Debug',
}

export class Message {
  text: string
  level: MessageLevel

  constructor(text: string, level: MessageLevel) {
    this.text = text
    this.level = level
  }
}
