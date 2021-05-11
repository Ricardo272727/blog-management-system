module.exports = {
  create: {
    type: "object",
    required: ["start_hour", "end_hour", "date", "user_id", "laboratory_id"],
    properties: {
      start_hour: {
        type: "string",
        format: "time",
      },
      end_hour: {
        type: "string",
        format: "time",
      },
      date: {
        type: "string",
        format: "date",
      },
      user_id: {
        type: "integer",
        min: 0
      },
      laboratory_id: {
        type: "integer",
        min: 0,
      },
    },
    additionalProperties: false,
  },
  edit: {
    type: "object",
    properties: {
      start_hour: {
        type: "string",
        format: "time",
      },
      end_hour: {
        type: "string",
        format: "time",
      },
      date: {
        type: "string",
        format: "date",
      },
      user_id: {
        type: "integer",
        min: 0
      },
      laboratory_id: {
        type: "integer",
        min: 0,
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
