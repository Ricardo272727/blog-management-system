module.exports = {
  type: "object",
  required: ["username", "password"],
  properties: {
    username: {
      type: "string",
      minLength: 4
    },
    password: {
      type: "string",
      minLength: 4
    }
  },
  additionalProperties: false
}
