import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const extractTextFromPDF = async (buffer) => {
  const uint8Array = new Uint8Array(buffer);

  const pdf = await pdfjsLib.getDocument({
    data: uint8Array,
  }).promise;

  let extractedText = "";

  for (let page = 1; page <= pdf.numPages; page++) {
    const currentPage = await pdf.getPage(page);

    const content = await currentPage.getTextContent();

    const pageText = content.items.map((item) => item.str).join(" ");

    extractedText += pageText + "\n";
  }

  return extractedText;
};
