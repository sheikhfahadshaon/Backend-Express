const { z } = require("zod");

const noteSchema = z.object({
    title: z.string(),
    body: z.string().optional(),
});

module.exports = { noteSchema };
