export interface ParsePdfOptions {
  maxFileSizeMB?: number;
}

export interface ParsedPdfResult {
  text: string;
}

export async function parsePdfFile(
  file: File,
  options: ParsePdfOptions = {},
): Promise<ParsedPdfResult> {
  const { maxFileSizeMB = 5 } = options;

  try {
    if (file.type !== "application/pdf") {
      throw new Error("Invalid file type. Only PDF allowed.");
    }

    const maxBytes = maxFileSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      throw new Error(`File exceeds ${maxFileSizeMB}MB limit.`);
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length === 0) {
      throw new Error("The uploaded file is empty or corrupted.");
    }

    const base64Data = buffer.toString("base64");

    return {
      text: base64Data,
    };
  } catch (error: any) {
    console.error("PDF parsing failed:", error.message);
    throw new Error("Failed to parse PDF file.");
  }
}
