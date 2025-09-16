export class ApplicationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ApplicationError"
  }
}

export class Nip07LoginError extends ApplicationError {
  constructor(message: string) {
    super(message)
    this.name = "Nip07LoginError"
  }
}

export class Nip46LoginError extends ApplicationError {
  constructor(message: string) {
    super(message)
    this.name = "Nip46LoginError"
  }
}

export class Nip55LoginError extends ApplicationError {
  constructor(message: string) {
    super(message)
    this.name = "Nip55LoginError"
  }
}
