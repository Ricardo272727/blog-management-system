module.exports = {
  create: {
    type: "object",
    required: ["name", "busy", "user_id"],
    properties: {
      name: {
        type: "string"        
      },
      busy: {
        type: "boolean",
      },
      user_id: {
        type: "integer",
        min: 0
      },
    },
    additionalProperties: false,
  },
  edit: {
    type: "object",
    properties: {
      name: {
        type: "string"        
      },
      busy: {
        type: "boolean",
      },
      user_id: {
        type: "integer",
        min: 0
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
    },
    additionalProperties: false,
  },
};
