import { uploadGeneratedPhotoToFirebase } from "@/lib/db";
import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import sharp from "sharp";
import path from "path";
import { promises as fs } from "fs";
import { printImage } from "@/lib/printer";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) {
    return new NextResponse("Missing url", { status: 400 });
  }

  try {
    // Descarga la imagen generada por la api de faceswap
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const originalImageBuffer = Buffer.from(response.data);

    // Se agrega el fondo con presencia de marca
    const backgroundPath = path.join(process.cwd(), "public", "bg.webp");
    const backgroundBuffer = await fs.readFile(backgroundPath);

    const backgroundSharp = sharp(backgroundBuffer);

    // Pone la imagen descargada sobre el fondo, estas dimensiones de 900 x 1580 se deben ajustar manualmente a la imagen utilizada
    const resizedImageBuffer = await sharp(originalImageBuffer)
      .resize(900, 1580, { fit: "cover" })
      .toBuffer();

    // Centra la imagen en el fonfo
    const leftMargin = Math.round((1080 - 900) / 2);
    const topMargin = 270;

    // Genera la imagen final
    const finalBuffer = await backgroundSharp
      .composite([
        {
          input: resizedImageBuffer,
          top: topMargin,
          left: leftMargin,
        },
      ])
      .png() // Salida en PNG (ajusta a tu gusto)
      .toBuffer();

    // Genera un blob para subir la imagen a firebase y tambien en base64 en caso de necesitar imprimirla
    const finalBlob = new Blob([finalBuffer], { type: "image/webp" });
    const base64Image = finalBuffer.toString("base64");

    // Sube la imagen a firebase
    const generatedUrl = await uploadGeneratedPhotoToFirebase(finalBlob);

    // printImage(base64Image);

    return NextResponse.json({ url: generatedUrl, base64: base64Image });
  } catch (error) {
    console.error("Error al procesar la imagen:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
