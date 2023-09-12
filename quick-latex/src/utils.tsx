export enum ExportType {
  PNG = "png",
  GIF = "gif",
  SVG = "svg",
  PDF = "pdf",
  EMF = "emf",
}

enum DownloadFormat {
  IMAGE = "image",
  JSON = "json",
  JS = "javascript",
  DOWNLOAD = "download",
}

export const BASE_URL = "https://latex.codecogs.com/";

export const DISPLAY_LATEX_URL = "https://latex.codecogs.com/png.image?" + encodeURIComponent("\\dpi{512}");
//const latexUrlDark = "https://latex.codecogs.com/png.image?" + encodeURIComponent("\\dpi{512}\\bg{white}");
