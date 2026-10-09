import type { FieldHook } from "payload";

/** Unique text fields must store null instead of `''` so create forms can save. */
export const emptyToNull: FieldHook = ({ value }) => {
  if (typeof value === "string" && value.trim() === "") return null;
  return value;
};
