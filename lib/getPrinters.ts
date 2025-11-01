import { getPrinters } from "pdf-to-printer";

const listarImpresoras = async () => {
  try {
    const printers = await getPrinters();
    console.log(printers);
  } catch (error) {
    console.error("Error al listar impresoras:", error);
  }
};

listarImpresoras();
