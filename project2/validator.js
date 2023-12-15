const { z } = require('zod')

const UserSchema = z.object({
    name: z.string(),
    university: z.string(),
    District: z.string(),
});


module.exports = { UserSchema };

