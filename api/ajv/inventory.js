module.exports = {
  create: {
    type: "object", 
    required: ["name", "amount", "laboratory_id"],
    properties: {
      name: {
        type: "string"        
      },
      amount: {
        type: "string",
        match: "^[0-9]+$"
      },
      laboratory_id: {
        type: "string",
        match: "^[0-9]+$"
      }
    },
    additionalProperties: false
  },
  edit: {
    type: "object", 
    properties: {
      name: {
        type: "string"        
      },
      amount: {
        type: "string",
        match: "^[0-9]+$"
      },
      laboratory_id: {
        type: "string",
        match: "^[0-9]+$"
      },
      image: {
        type: "string"
      }
    },
    minProperties: 1,
    additionalProperties: false
  },
  file: {
    type: "object",
    properties:{
      mimetype: {
        type: "string",
        enum: ['image/jpeg', 'image/png', 'image/jpg']
      },
      size: {
        type:  "integer",
        max: 5000000
      }
    }
  },
  idParam: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string',
        match: "^[0-9]+$"
      }
    },
    additionalProperties: false 
  },
  optionalId: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        match: "^[0-9]+$"
      }
    },
    additionalProperties: false 
  }
}
