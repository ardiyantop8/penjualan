export function parseJSON(value) {
  try {
    return JSON.parse(value);
  } catch (err) {
    return value;
  }
}

export function jsonToStringLimiter(value = null) {
  try {
    if (value) {
      const convertData = JSON.stringify(value);
      let newData = "";

      if (convertData.length > 200) {
        newData = convertData.substring(0, 200) + "***}";
      } else {
        newData = convertData;
      }

      return newData;
    }

    return null;
  } catch (e) {
    return e;
  }
}

export function errorState(name, errors) {
  const parts = name.split(".");
  let value = errors;
  for (let part of parts) {
    if (!value) {
      break;
    }

    const index = Number(part);
    value = !isNaN(index) ? value[index] : value[part];
  }

  return value;
}

export function ascendingStringify(obj) {
  if (Array.isArray(obj)) {
    return '[' + obj.map(ascendingStringify).join(',') + ']';
  } else if (obj && typeof obj === 'object') {
    return '{' + Object.keys(obj).sort().map(
      key => JSON.stringify(key) + ':' + ascendingStringify(obj[key])
    ).join(',') + '}';
  } else {
    return JSON.stringify(obj);
  }
}
