import Joi from 'joi';

/* eslint newline-per-chained-call: ["error", { "ignoreChainWithDepth": 5 }] */
export const schemaAdd = Joi.object({
  title: Joi.string().min(2).max(100).trim().required(),
  description: Joi.string().min(2).trim(),
  compleated: Joi.boolean(),
  isprivate: Joi.boolean()
});

export const schemaEdit = Joi.object({
  title: Joi.string().min(2).max(100).trim(),
  description: Joi.string().min(2).trim(),
  compleated: Joi.boolean(),
  isprivate: Joi.boolean()
});
