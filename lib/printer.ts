export async function printImage(base64) {
  try {
    const response = await fetch(`http://127.0.0.1:4321/print`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64 }),
    });

    if (response.ok) {
      console.log("Imagen enviada correctamente para impresión");
    } else {
      console.error("Error al enviar la imagen al backend");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
