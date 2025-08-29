import * as pdfjsLib from "pdfjs-dist";

import pdfjsWorker from "pdfjs-dist/build/pdf.worker?worker";
pdfjsLib.GlobalWorkerOptions.workerPort = new pdfjsWorker();

export const renderFirstPageToImage = async (pdfUrl) => {
  const loadingTask = pdfjsLib.getDocument(pdfUrl);

  const pdf = await loadingTask.promise;

  const page = await pdf.getPage(1);

  const viewport = page.getViewport({ scale: 1.5 });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };

  await page.render(renderContext).promise;

  return canvas.toDataURL(); // base64 image string
};
