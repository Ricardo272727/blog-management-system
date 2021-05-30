module.exports = {
  create: {
    type: "object",
    required: ["name", "nickname", "password"],
    properties: {
      name: {
        type: "string",
      },
      nickname: {
        type: "string",
        pattern: "^[A-Za-z0-9]+$",
        minLength: 3
      },
      password: {
        type: "string",
      },
    },
    additionalProperties: false,
  },
  edit: {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      nickname: {
        type: "string",
        pattern: "^[A-Za-z0-9]+$",
        minLength: 3
      },
      password: {
        type: "string",
      },
    },
    minProperties: 1,
    additionalProperties: false,
  },
  idParam: {
    type: "object",
    required: ["id"],
    properties: {
      id: {
        type: "string",
        match: "^[0-9]+$",
      },
    },
    additionalProperties: false,
  },
  optionalId: {
    type: "object",
    properties: {
      id: {
        type: "string",
        match: "^[0-9]+$",
      },
      laboratory_id: {
        type: "string",
        match: "^[0-9]+$",
      },
    },
    additionalProperties: false,
  },
};
