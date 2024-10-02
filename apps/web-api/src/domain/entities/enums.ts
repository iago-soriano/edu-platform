export enum Languages {}

export enum ActivityFormat {
  READING = 'READING',
  LISTENING = 'LISTENING',
}

export enum ActivityLevel {
  BASIC = 'BASIC',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export enum ActivityStatus {
  PENDING = 'PENDING',
  READY = 'READY',
}

export enum ActivityBlockType {
  TEXT = 'TEXT',
  AUDIO = 'AUDIO',
  TEXT_QUESTION = 'TEXT_QUESTION',
  MULTIPLE_CHOICE_QUESTION = 'MULTIPLE_CHOICE_QUESTION',
}

export enum OutputStatus {
  PENDING = 'PENDING',
  READY = 'READY',
  REVIEWED = 'REVIEWED',
}
