import { string, boolean, object, TypeOf } from "zod";

const updateVideoSchema = {
  body: object({
    title: string(),
    description: string(),
    published: boolean(),
  }),
  params: object({
    videoId: string(),
  }),
};

export type updateVideoBody = TypeOf<typeof updateVideoSchema.body>;
export type updateVideoParams = TypeOf<typeof updateVideoSchema.params>;
