
 // Generates a multi-page A4 resume PDF with smart page splitting.
async function generateResumePDF(resumeElement, resumeName) {
  // Load PDF libraries only when the user requests a download.
  const [{ default: html2canvas }, { default: jsPDF }] =
    await Promise.all([
      import("html2canvas"),
      import("jspdf"),
    ]);

  const canvas = await html2canvas(resumeElement, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
  });

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const pagePixelHeight =
    (canvas.width * pageHeight) / pageWidth;

  const resumeRect = resumeElement.getBoundingClientRect();
  const scaleY = canvas.height / resumeRect.height;

  // Collect blocks that should preferably stay together.
  const keepTogetherBlocks = Array.from(
    resumeElement.querySelectorAll(
      ".pdf-keep-together, .resume-entry"
    )
  )
    .map((element) => {
      const rect = element.getBoundingClientRect();

      return {
        top: (rect.top - resumeRect.top) * scaleY,
        bottom: (rect.bottom - resumeRect.top) * scaleY,
        height: rect.height * scaleY,
      };
    })
    .filter((block) => block.height < pagePixelHeight);

  // Collect sections that must start on a new page.
  const forcedPageStarts = Array.from(
    resumeElement.querySelectorAll(".pdf-page-start")
  ).map((element) => {
    const rect = element.getBoundingClientRect();

    return (rect.top - resumeRect.top) * scaleY;
  });

  let startY = 0;
  let pageNumber = 0;

  while (startY < canvas.height) {
    const pageTopPadding =
      pageNumber > 0 ? 24 * scaleY : 0;

    const availablePageHeight =
      pagePixelHeight - pageTopPadding;

    let endY = Math.min(
      startY + availablePageHeight,
      canvas.height
    );

    // Honor forced page-start sections.
    const nextForcedPageStart = forcedPageStarts.find(
      (position) =>
        position > startY + 10 && position < endY
    );

    if (nextForcedPageStart) {
      endY = nextForcedPageStart;
    }

    // Prevent splitting smaller sections or entries.
    if (endY < canvas.height) {
      const crossingBlock = keepTogetherBlocks
        .filter(
          (block) =>
            block.top < endY &&
            block.bottom > endY &&
            block.height < availablePageHeight &&
            block.top > startY + 80
        )
        .sort((a, b) => a.top - b.top)[0];

      if (crossingBlock) {
        endY = crossingBlock.top;
      }
    }

    let sliceHeight = Math.ceil(endY - startY);

    // Ensure the pagination loop always progresses.
    if (sliceHeight <= 0) {
      endY = Math.min(
        startY + availablePageHeight,
        canvas.height
      );

      sliceHeight = Math.ceil(endY - startY);
    }

    if (sliceHeight <= 0) {
      break;
    }

    const pageCanvas = document.createElement("canvas");

    pageCanvas.width = canvas.width;
    pageCanvas.height = sliceHeight + pageTopPadding;

    const context = pageCanvas.getContext("2d");

    if (!context) {
      throw new Error("Unable to create PDF canvas context.");
    }

    // Paint the page background white.
    context.fillStyle = "#ffffff";
    context.fillRect(
      0,
      0,
      pageCanvas.width,
      pageCanvas.height
    );

    // Draw the current resume page slice.
    context.drawImage(
      canvas,
      0,
      startY,
      canvas.width,
      sliceHeight,
      0,
      pageTopPadding,
      canvas.width,
      sliceHeight
    );

    const pageImage = pageCanvas.toDataURL("image/png");

    const imageHeight =
      (pageCanvas.height * pageWidth) / canvas.width;

    if (pageNumber > 0) {
      pdf.addPage();
    }

    pdf.addImage(
      pageImage,
      "PNG",
      0,
      0,
      pageWidth,
      imageHeight
    );

    startY = endY;
    pageNumber++;
  }

  // Clean the filename before saving.
  const safeName = resumeName
    .trim()
    .replace(/[<>:"/\\|?*]/g, "_");

  pdf.save(`${safeName}.pdf`);
}

export default generateResumePDF;
