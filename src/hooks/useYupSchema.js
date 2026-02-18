import * as yup from "yup";

function createYupSchema(schema, config) {
  const { name, validationType, validations = [] } = config;
  if (!yup[validationType]) {
    return schema;
  }
  let validator = yup[validationType]();
  validations.forEach((validation) => {
    let { params = [], type } = validation;
    if (!validator[type]) {
      return;
    }
    if (type === "required" && params.length === 0) {
      params = ["Kolom wajib diisi"];
    }
    validator = validator[type](...params);
  });
  schema[name] = validator;
  return schema;
}

function useYupSchema(fields = []) {
  const yupSchema = fields.reduce(createYupSchema, {});

  return yup
    .object({
      ...yupSchema,
    })
    .required();
}

export default useYupSchema;
