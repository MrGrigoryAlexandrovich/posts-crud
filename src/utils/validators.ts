import Joi, { ObjectSchema } from "joi";

const postSchema: ObjectSchema = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
});

const validatePost = (post: any) => {
  const { error } = postSchema.validate(post);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

export { validatePost };
