class ServiceResponse {
  constructor (success = true, content = {}) {
    this.success = success
    this.content = content
  }
}

module.exports = ServiceResponse
