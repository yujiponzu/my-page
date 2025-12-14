import { promises as fs } from "fs";
import path from "path";

const allowedFiles = new Set(["profile", "education", "publications", "others", "contact"]);

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params;

  if (!allowedFiles.has(slug)) {
    return new Response("Not found", { status: 404 });
  }

  const filePath = path.join(process.cwd(), "data", `${slug}.json`);

  try {
    const data = await fs.readFile(filePath, "utf-8");
    return new Response(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(`Failed to read data file for ${slug}:`, error);
    return new Response("Failed to load data", { status: 500 });
  }
}
