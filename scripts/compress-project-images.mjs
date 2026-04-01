import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PROJECT_IMAGES_DIR = path.resolve("public/images/projects");
const MAX_WIDTH = 1200;
const WEBP_QUALITY = 78;

const SUPPORTED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

async function getProjectImageFiles() {
  const entries = await fs.readdir(PROJECT_IMAGES_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => SUPPORTED_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort();
}

async function convertImageToWebp(fileName) {
  const inputPath = path.join(PROJECT_IMAGES_DIR, fileName);
  const outputName = `${path.parse(fileName).name}.webp`;
  const outputPath = path.join(PROJECT_IMAGES_DIR, outputName);

  const inputBuffer = await fs.readFile(inputPath);
  const inputSizeKB = inputBuffer.length / 1024;

  const transformed = await sharp(inputBuffer)
    .resize({
      width: MAX_WIDTH,
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({
      quality: WEBP_QUALITY,
      effort: 5,
    })
    .toBuffer();

  await fs.writeFile(outputPath, transformed);

  const outputSizeKB = transformed.length / 1024;
  const reduction = inputSizeKB > 0 ? ((inputSizeKB - outputSizeKB) / inputSizeKB) * 100 : 0;

  return {
    fileName,
    outputName,
    inputSizeKB,
    outputSizeKB,
    reduction,
  };
}

async function main() {
  const files = await getProjectImageFiles();

  if (files.length === 0) {
    console.log("No PNG/JPG files found in public/images/projects.");
    return;
  }

  console.log(`Converting ${files.length} project images to WebP (max width ${MAX_WIDTH}px)...`);

  const results = [];
  for (const file of files) {
    const result = await convertImageToWebp(file);
    results.push(result);
  }

  let totalIn = 0;
  let totalOut = 0;

  for (const result of results) {
    totalIn += result.inputSizeKB;
    totalOut += result.outputSizeKB;
    console.log(
      `${result.fileName} -> ${result.outputName} | ${result.inputSizeKB.toFixed(1)}KB -> ${result.outputSizeKB.toFixed(1)}KB (${result.reduction.toFixed(1)}%)`,
    );
  }

  const totalReduction = totalIn > 0 ? ((totalIn - totalOut) / totalIn) * 100 : 0;
  console.log("\nSummary");
  console.log(`Input total:  ${totalIn.toFixed(1)}KB`);
  console.log(`Output total: ${totalOut.toFixed(1)}KB`);
  console.log(`Reduction:    ${totalReduction.toFixed(1)}%`);
  console.log("\nTip: review any output still above 200KB and lower quality if needed.");
}

main().catch((error) => {
  console.error("Failed to compress project images:", error);
  process.exitCode = 1;
});
