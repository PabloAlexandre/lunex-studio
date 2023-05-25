import { AlignmentBaseSchema } from "./base/alignment";
import { PositioningBaseSchema } from "./base/positioning";
import { StylesBaseSchema } from "./base/styles";

export const ObjectBaseSchema = {
  ...PositioningBaseSchema,
  ...AlignmentBaseSchema,
  ...StylesBaseSchema,
}