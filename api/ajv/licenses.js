module.exports = {
  create: {
    type: "object",
    required: ["name", "start_datetime", "end_datetime", "status"],
    properties: {
      name: {
        type: "string"        
      },
      start_datetime: {
        type: "string",
        format: "date-time",
      },
      end_datetime: {
        type: "string",
        format: "date-time",
      },
      status: {
        type: "string",
        enum: ["expirada", "activa"]
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
      start_datetime: {
        type: "string",
        format: "date-time",
      },
      end_datetime: {
        type: "string",
        format: "date-time",
      },
      status: {
        type: "string",
        enum: ["expirada", "activa"]
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
