import { readFile } from "node:fs/promises";
import path from "node:path";

const RESUME_FILENAME = "Showri-Konda-Resume.pdf";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", RESUME_FILENAME);
    const pdf = await readFile(filePath);

    return new Response(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${RESUME_FILENAME}"`,
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  } catch {
    return Response.json({ error: "Resume file not found." }, { status: 404 });
  }
}
