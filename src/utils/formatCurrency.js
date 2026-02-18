export const formatCurrencyRupiah = (
  value,
  country = "id-ID",
  curr = "IDR"
) => {
  if (value === undefined || value === null) return "";
  let formattedValue = new Intl.NumberFormat(country, {
    style: "currency",
    currency: curr,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

  return formattedValue.replace(/\s/g, "");
};
