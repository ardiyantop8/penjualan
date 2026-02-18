import { useMemo } from "react";
import useYupSchema from "./useYupSchema";

export function useFormValidation(fields) {
  const validationSchema = useYupSchema(fields);
  const defaultValues = useMemo(
    () =>
      fields.reduce(
        (acc, item) => ({
          ...acc,
          [item.name]: item.getValue(),
        }),
        {}
      ),
    [fields]
  );

  return { defaultValues, validationSchema };
}
