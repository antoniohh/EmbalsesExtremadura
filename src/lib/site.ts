export const SITE = "https://embalses.antoniohorrillo.com";
export const SITE_NAME = "Embalses de Extremadura";
export const SITE_SHORT_NAME = "Embalses EX";
export const SITE_DESCRIPTION =
  "Estado de los embalses de Extremadura: nivel de agua, capacidad, variación semanal e histórico con datos oficiales del MITECO.";
export const AUTHOR_NAME = "Antonio Horrillo";
export const AUTHOR_URL = "https://antoniohorrillo.com";
export const GA_ID = "G-MK7WEP5HN0";
export const COOKIE_STORAGE_KEY = "embalses_extremadura_cookie_consent";
export const GOOGLE_SITE_VERIFICATION = ""; // Código opcional para verificación de propiedad en Google Search Console

export const SITE_KEYWORDS = [
  "embalses extremadura",
  "estado embalses badajoz",
  "estado embalses caceres",
  "nivel embalses extremadura",
  "capacidad embalses extremadura",
  "embalse la serena",
  "embalse alcantara",
  "embalse cijara",
  "embalse gabriel y galan",
  "boletin hidrologico miteco",
  "pantanos extremadura",
  "agua embalsada extremadura",
];

export function absoluteUrl(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return cleanPath ? `${SITE}/${cleanPath}` : `${SITE}/`;
}

export function withBase(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `/${cleanPath}`;
}
