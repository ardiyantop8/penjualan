/* Formatting 500000 to Rp500.000,00
  implementasi di src/pages/prakarsa/prakarsa-korporasi/informasi-nasabah/pengecekan-kredit/dialog-lihat-sicd.jsx 
  country dan curr disesuaikan dengan negara dan mata uang
  minFrac dan maxFrac disesuaikan dengan jumlah angka di belakang koma */
export const formatCurrency = (
  value,
  country = "id-ID",
  curr = "IDR",
  minFrac = 0,
  maxFrac = 0
) => {
  if (value === undefined || value === null) return "";
  let formattedValue = new Intl.NumberFormat(country, {
    style: "currency",
    currency: curr,
    minimumFractionDigits: minFrac,
    maximumFractionDigits: maxFrac,
  }).format(value);

  return formattedValue.replace(/\s/g, "");
};

export const formatResponseDesc = (desc) => {
  return desc
    .replace(/_(\w)/g, (_match, p1) => " " + p1.toUpperCase())
    .replace(/brispot/gi, "BRISPOT");
};

export function dashedAccount(value) {
  // Remove numeric characters from the input
  const filteredValue = value?.replace(
    /[A-Za-z\s!@#$%^&*_+{}()=`"[\]:;<>,?~\\|\\/-]/g,
    ""
  );
  // Replace the matched pattern with the matched group + a dash
  if (filteredValue?.length > 14) {
    const dashedValue = filteredValue.replace(
      /(\d{4})(\d{2})(\d{6})(\d{2})(\d{1})/g,
      "$1-$2-$3-$4-$5"
    );
    return dashedValue ?? "";
  } else if (filteredValue?.length > 12) {
    const dashedValue = filteredValue.replace(
      /(\d{4})(\d{2})(\d{6})(\d{1})/g,
      "$1-$2-$3-$4"
    );
    return dashedValue ?? "";
  } else if (filteredValue?.length > 6) {
    const dashedValue = filteredValue.replace(
      /(\d{4})(\d{2})(\d{1})/g,
      "$1-$2-$3"
    );
    return dashedValue ?? "";
  } else if (filteredValue?.length > 4) {
    const dashedValue = filteredValue.replace(/(\d{4})(\d{1})/g, "$1-$2");
    return dashedValue ?? "";
  } else {
    return filteredValue ?? "";
  }
}

/* Formatting 500000.95 to 500.000,95 
  implementasi di src/pages/prakarsa/prakarsa-bg/index.jsx 
  minFrac dan maxFrac disesuaikan dengan jumlah angka di belakang koma */
export const formatNominal = (
  value,
  locale = "id-ID",
  minFrac = 0,
  maxFrac = 0,
  commaSeparator = ","
) => {
  if (value === undefined || value === null || value === "") return "";

  let numberValue;
  if (typeof value === "number") {
    numberValue = value;
  } else if (typeof value === "string") {
    if (value.includes(",")) {
      numberValue = Number(value.replace(/\./g, "").replace(",", "."));
    } else {
      numberValue = Number(value);
    }
  } else {
    return value;
  }
  
  if (isNaN(numberValue)) return value;
  
  const formatted = numberValue.toLocaleString(locale, {
    minimumFractionDigits: minFrac,
    maximumFractionDigits: maxFrac,
  });

  return formatted.replace(/,/g, commaSeparator);
};

export const titleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const stringToBoolean = (str) => {
  if (str === "true" || str === "false") {
    return str === "true";
  } else {
    return;
  }
};

export function dashedNPWP(value) {
  // Hapus karakter non-numerik dari input
  const filteredValue = value?.replace(/[^\d]/g, "");

  // Terapkan format sesuai panjang angka
  if (filteredValue?.length > 15) {
    const dashedValue = filteredValue.replace(
      /(\d{2})(\d{3})(\d{3})(\d{1})(\d{3})(\d{4})/,
      "$1.$2.$3.$4-$5.$6"
    );
    return dashedValue ?? "";
  } else if (filteredValue?.length > 12) {
    const dashedValue = filteredValue.replace(
      /(\d{2})(\d{3})(\d{3})(\d{1})(\d{3})/,
      "$1.$2.$3.$4-$5"
    );
    return dashedValue ?? "";
  } else if (filteredValue?.length > 9) {
    const dashedValue = filteredValue.replace(
      /(\d{2})(\d{3})(\d{3})(\d{1})/,
      "$1.$2.$3.$4"
    );
    return dashedValue ?? "";
  } else if (filteredValue?.length > 6) {
    const dashedValue = filteredValue.replace(
      /(\d{2})(\d{3})(\d{1})/,
      "$1.$2.$3"
    );
    return dashedValue ?? "";
  } else if (filteredValue?.length > 2) {
    const dashedValue = filteredValue.replace(
      /(\d{2})(\d{3})/,
      "$1.$2"
    );
    return dashedValue ?? "";
  } else {
    return filteredValue ?? "";
  }
}
