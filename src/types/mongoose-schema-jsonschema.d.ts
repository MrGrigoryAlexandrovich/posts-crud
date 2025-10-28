declare module "mongoose-schema-jsonschema" {
  import { Mongoose, Schema } from "mongoose";

  export function toJSONSchema(mongoose: Mongoose): void;
  export function toJSONSchema(schema: Schema): Record<string, any>;
}
