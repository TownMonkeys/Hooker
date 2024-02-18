export default function useObjectToFormData(data) {
  const formData = new FormData();

  function processObject(obj, prefix = "") {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object" && key !== "attachment") {
        processObject(value, `${prefix}${key}.`);
      } else {
        formData.append(`${prefix}${key}`, value);
      }
    }
  }

  processObject(data);
  return formData;
}
