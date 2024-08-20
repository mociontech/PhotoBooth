import { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import html2canvas from "html2canvas";
import "./App.css";
import uploadStringBase64 from "./firebase/firestorage";
import saveUserFirebase from "./firebase/firestore";
import axios from "axios";

function App() {
  const [screenACtive, setScreenActive] = useState(1);
  const [product, setProduct] = useState(0);
  const [hairstyle, setHairStyle] = useState("");
  const [countdown, setCountdown] = useState(8);
  const [image, setImage] = useState<string | null>("");
  const [email, setEmail] = useState(""); //subir a firebase
  const [name, setName] = useState(""); // subir a firebase
  const [imageUrl, setImageUrl] = useState(""); // subir a firebase
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showGroupIndividual, setShowGroupIndividual] = useState(false);
  const [showIndividualImage, setShowIndividualImage] = useState(false);
  const [showGroupImage, setShowGroupImage] = useState(false);
  const [showBackground, setShowBackground] = useState(true);
  const [lastGif, setLastGif] = useState(""); // Estado para guardar el último file2Gif seleccionado
  const [lastImage, setLastImage] = useState("");

  const hairstyles = {
    2000: [
      {
        key: "2000-hair-5", //grupo
        file: "img/group.png",
        file2: "img/EQUIPO 4 ESCALADO L.gif",
        file2Image: "img/EQUIPO CERCA.png",
      },
      {
        key: "2000-hair-6", //grupo
        file: "img/logo2.png",
        file2: "img/EQUIPO 6 ESCALADO.gif",
        file2Image: "img/EQUIPO 6 CERCA.png",
      },
      {
        key: "2000-hair-7", // george
        file: "img/logo3.png",
        file2: "img/JUGADOR AGACHADO.gif",
        file2Image: "img/JUGADOR AGACHADO.png",
      },
      {
        key: "2000-hair-8", //Romero
        file: "img/logo4.png",
        file2: "img/JUGADOR BALON.gif",
        file2Image: "img/JUGADOR BALON.png",
      },
      {
        key: "2000-hair-9", //Toro
        file: "img/logo5.png",
        file2: "img/JUGADOR CAMISETA.gif",
        file2Image: "img/JUGADOR CAMISETA.png",
      },
      {
        key: "2000-hair-10", //criss
        file: "img/logo6.png",
        file2: "img/JUGADOR CRUZADO BRAZOS.gif",
        file2Image: "img/JUGADOR CRUZADO BRAZOS.png",
      },
      {
        key: "2000-hair-10", //gian
        file: "img/logo7.png",
        file2: "img/JUGADOR DEDO.gif",
        file2Image: "img/JUGADOR DEDO.png",
      },
      {
        key: "2000-hair-10", //jose
        file: "img/logo8.png",
        file2: "img/JUGADOR DEDOS.gif",
        file2Image: "img/JUGADOR DEDOS.png",
      },
      {
        key: "2000-hair-10", //tremon
        file: "img/logo9.png",
        file2: "img/JUGADOR ESPALDA.gif",
        file2Image: "img/JUGADOR ESPALDA.png",
      },
      {
        key: "2000-hair-10", //tremon
        file: "img/logo10.png",
        file2: "img/JUGADOR FIRME.gif",
        file2Image: "img/JUGADOR FIRME.png",
      },
      {
        key: "2000-hair-10", //davon
        file: "img/logo11.png",
        file2: "img/JUGADOR TRENZAS AGACHADO.gif",
        file2Image: "img/JUGADOR PUÑO.png",
      },
      {
        key: "2000-hair-10", //steph
        file: "img/logo12.png",
        file2: "img/JUGADOR 11.gif",
        file2Image: "img/JUGADOR 11.png",
      },
      {
        key: "2000-hair-10", //ford
        file: "img/logo13.png",
        file2: "img/JUGADOR DEDOS 2.gif",
        file2Image: "img/JUGADOR DEDOS 2.png",
      },
      {
        key: "2000-hair-10", //isaiah
        file: "img/logo14.png",
        file2: "img/JUGADOR TODO BIEN.gif",
        file2Image: "img/JUGADOR TODO BIEN.png",
      },
    ],
  };

  const [isCameraReady, setIsCameraReady] = useState(false);

  const handleUserMedia = () => {
    setIsCameraReady(true);
    console.log("La cámara está activa");
  };

  const handleUserMediaError = (error: string | DOMException) => {
    console.error("Error al acceder a la cámara:", error);
    if (error instanceof DOMException) {
      console.error("Nombre del error:", error.name);
      console.error("Mensaje de error:", error.message);
    }
  };

  useEffect(() => {
    console.log(`isCameraReady changed: ${isCameraReady}`);
  }, [isCameraReady]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submittingss:", { email, name });
  };

  const exportAsImage = async () => {
    const element = document.querySelector("#miDiv");
    if (element instanceof HTMLElement) {
      // Verificar la visibilidad del fondo
      const fondo = document.querySelector(".background");
      if (fondo instanceof HTMLElement) {
        console.log("Fondo encontrado y visible:", fondo);
      } else {
        console.log("Fondo no encontrado o no visible");
      }

      const canvas = await html2canvas(element, {
        allowTaint: true,
        useCORS: true,
        logging: true,
        scale: 1,
      });

      const canvasImage = canvas.toDataURL("image/png", 1.0);
      const url = await uploadStringBase64(canvasImage);
      setImageUrl(url);
    } else console.error("Element not found");
  };

  const sendEmail = async () => {
    await axios.post("https://devapi.evius.co/api/correos-mocion", {
      email: email,
      html: `<img src=${imageUrl} />`,
      subject: "Foto basket",
    });
    console.log("email", email);
    console.log("email", imageUrl);
  };

  const saveUser = () => {
    saveUserFirebase(email, name);
  };

  const processPicture = () => {
    let imageSrc: string | undefined | null;
    if (webcamRef && "current" in webcamRef) {
      imageSrc = webcamRef.current?.getScreenshot();
    }
    setImage(imageSrc!);
    setShowBackground(true);
    console.log("estado del fondo", showBackground);

    setScreenActive(5);
  };

  const handleLogoClick = (file2Gif: string, file2Image?: string) => {
    const extendedGifKeys = [
      "img/EQUIPO 6 ESCALADO.gif",
      "img/JUGADOR BALON.gif",
    ]; // Los GIFs que necesitan más tiempo de reproducción
    const extendedTimeouts = [8000, 4000]; // Tiempos extendidos en milisegundos para cada GIF en el mismo orden
    const defaultTimeout = 5600; // Tiempo predeterminado en milisegundos para los otros GIFs

    setLastGif(file2Gif); // Guarda el último file2Gif seleccionado
    setLastImage(file2Image || "");
    setHairStyle(file2Gif); // Inicia mostrando el GIF

    // Cambia al archivo de imagen después del tiempo determinado
    setTimeout(
      () => {
        setHairStyle(file2Image || "");
      },
      extendedGifKeys.includes(file2Gif)
        ? extendedTimeouts[extendedGifKeys.indexOf(file2Gif)]
        : defaultTimeout
    );

    setScreenActive(3);
  };

  const handleChangePhoto = () => {
    handleLogoClick(lastGif, lastImage);
  };

  const renderScreen = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let html: any;
    switch (screenACtive) {
      case 2:
        html = (
          <div
            className={`screen screen-two ${screenACtive === 2 && "active"}`}
          >
            <div className="left">
              {hairstyles[product as keyof typeof hairstyles].map((data) => (
                <div
                  className={`menu menu-white${data.key}`}
                  onClick={() =>
                    handleLogoClick(data.file2 || "", data.file2Image || "")
                  }
                  style={{ backgroundImage: `url(/${data.file})` }}
                  role="button"
                  aria-hidden="true"
                  key={data.key}
                />
              ))}
            </div>
            <img
              src="/img/continuar.png"
              className="btn-next"
              onClick={() => {
                hairstyle !== "" && setScreenActive(screenACtive + 1);
              }}
              role="button"
            />
            <div>{hairstyle !== "" && <img src={`/${hairstyle}`} />}</div>
          </div>
        );
        break;
      case 3:
        setTimeout(() => {
          if (countdown > 1) {
            setCountdown(countdown - 1);
          } else if (countdown === 1) {
            // Hacer que el número 1 desaparezca después de un breve tiempo
            setTimeout(() => setCountdown(0), 500); // Reducido a 500ms para que el 1 se muestre y luego desaparezca
          }
        }, 1000); // Reducido a 1000 para ajustar a 3 segundos

        // Renderizar el contenido del conteo regresivo
        html = (
          <div>
            {/* Mostrar el fondo siempre que showBackground sea true */}
            {showBackground && (
              <>
                {/* Renderizar solo si countdown es mayor que 0 */}
                {countdown > 0 && (
                  <div className="countdown">
                    {/* Mostrar el número del conteo regresivo, pero condicionar para ocultar el 5 y el 4 */}
                    {countdown <= 5 ? countdown : null}
                  </div>
                )}
                <img
                  className="background"
                  src={`/img/fondo.png`}
                  alt="final countdown"
                />
              </>
            )}
          </div>
        );

        break;

      case 7:
        html = (
          <div
            style={{
              width: "1080px",
              height: "1920px",
              backgroundImage: "url('/img/email.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <form onSubmit={handleSubmit} className="form">
              <div>
                <input
                  className="form-input"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Correo electrónico"
                  required
                />
              </div>
              <div>
                <input
                  className="form-name"
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Nombre completo"
                  required
                />
              </div>
            </form>

            <div style={{ textAlign: "center", marginTop: "120px" }}>
              <button
                className="submit-button1"
                onClick={() => {
                  setHairStyle("");
                  setCountdown(5);
                  setIsCameraReady(false);
                  sendEmail();
                  saveUser();
                  setEmail("");
                  setName("");
                  setTimeout(() => {
                    window.location.reload();
                  }, 5000);
                }}
              >
                Enviar Foto
              </button>
              <button
                className="submit-button2"
                onClick={() => {
                  setScreenActive(3);
                  setCountdown(7);
                  setIsCameraReady(false);
                  handleChangePhoto();
                }}
              >
                Cambiar Foto
              </button>
            </div>
          </div>
        );
        console.log(name, email);
        break;
      default:
        html = (
          <div
            className={`screen screen-one ${screenACtive === 1 && "active"}`}
            onClick={() => setShowGroupIndividual(true)} // Mostrar el div con la imagen
          >
            {showGroupIndividual && !showIndividualImage && !showGroupImage && (
              <div style={{ overflow: "hidden" }}>
                <img
                  src="/img/grupal-individual.png"
                  alt="GrupalIndividual"
                  style={{ marginLeft: "-13px", marginTop: "-27px" }}
                />
                <div
                  className="center-box"
                  style={{
                    position: "absolute",
                    top: "58%",
                    left: "55%",
                    transform: "translate(-50%, -50%)",
                    width: "300px",
                    height: "300px",
                    border: "none",
                    zIndex: 1,
                  }}
                  onClick={() => setShowIndividualImage(true)}
                />
                <div
                  className="group-box"
                  style={{
                    position: "absolute",
                    top: "88%",
                    left: "55%",
                    transform: "translate(-50%, -50%)",
                    width: "300px",
                    height: "300px",
                    border: "none",
                    zIndex: 1,
                  }}
                  onClick={() => setShowGroupImage(true)}
                />
              </div>
            )}
            {showIndividualImage && (
              <div style={{ overflow: "hidden" }}>
                <img
                  src="/img/individual.png"
                  alt="Individual"
                  style={{
                    marginLeft: "-17px",
                    marginTop: "-40px",
                    transform: "scale(0.97)",
                  }}
                />
                <div
                  className="Cris-Ortiz"
                  style={{
                    position: "absolute",
                    top: "47%",
                    left: "20%",
                    transform: "translate(-50%, -50%)",
                    width: "190px",
                    height: "220px",
                    border: "none",
                    zIndex: 1,
                  }}
                  onClick={() => {
                    const group2000 = hairstyles[2000].find(
                      (data) => data.file === "img/logo6.png"
                    );
                    if (group2000) {
                      handleLogoClick(group2000.file2, group2000.file2Image);

                      setProduct(2000);
                    }
                  }}
                />
                <div
                  className="Davon-Reed"
                  style={{
                    position: "absolute",
                    top: "47%",
                    left: "51%",
                    transform: "translate(-50%, -50%)",
                    width: "190px",
                    height: "220px",
                    border: "none",
                    zIndex: 1,
                  }}
                  onClick={() => {
                    const group2000 = hairstyles[2000].find(
                      (data) => data.file === "img/logo11.png"
                    );
                    if (group2000) {
                      handleLogoClick(group2000.file2, group2000.file2Image);

                      setProduct(2000);
                    }
                  }}
                />
                <div
                  className="George-Conditt"
                  style={{
                    position: "absolute",
                    top: "47%",
                    left: "83%",
                    transform: "translate(-50%, -50%)",
                    width: "190px",
                    height: "220px",
                    border: "none",
                    zIndex: 1,
                  }}
                  onClick={() => {
                    const group2000 = hairstyles[2000].find(
                      (data) => data.file === "img/logo3.png"
                    );
                    if (group2000) {
                      handleLogoClick(group2000.file2, group2000.file2Image);

                      setProduct(2000);
                    }
                  }}
                />
                <div
                  className="Gian-Clavell"
                  style={{
                    position: "absolute",
                    top: "62%",
                    left: "20%",
                    transform: "translate(-50%, -50%)",
                    width: "190px",
                    height: "220px",
                    border: "none",
                    zIndex: 1,
                  }}
                  onClick={() => {
                    const group2000 = hairstyles[2000].find(
                      (data) => data.file === "img/logo7.png"
                    );
                    if (group2000) {
                      handleLogoClick(group2000.file2, group2000.file2Image);

                      setProduct(2000);
                    }
                  }}
                />
                <div
                  className="Jordan-Howard"
                  style={{
                    position: "absolute",
                    top: "62%",
                    left: "51%",
                    transform: "translate(-50%, -50%)",
                    width: "190px",
                    height: "220px",
                    border: "none",
                    zIndex: 1,
                  }}
                  onClick={() => {
                    const group2000 = hairstyles[2000].find(
                      (data) => data.file === "img/logo10.png"
                    );
                    if (group2000) {
                      handleLogoClick(group2000.file2, group2000.file2Image);

                      setProduct(2000);
                    }
                  }}
                />
                <div
                  className="Ysmael-Romero"
                  style={{
                    position: "absolute",
                    top: "62%",
                    left: "83%",
                    transform: "translate(-50%, -50%)",
                    width: "190px",
                    height: "220px",
                    border: "none",
                    zIndex: 1,
                  }}
                  onClick={() => {
                    const group2000 = hairstyles[2000].find(
                      (data) => data.file === "img/logo4.png"
                    );
                    if (group2000) {
                      handleLogoClick(group2000.file2, group2000.file2Image);

                      setProduct(2000);
                    }
                  }}
                />

                <div
                  className="Arnaldo-Toro"
                  style={{
                    position: "absolute",
                    top: "78%",
                    left: "20%",
                    transform: "translate(-50%, -50%)",
                    width: "190px",
                    height: "220px",
                    border: "none",
                    zIndex: 1,
                  }}
                  onClick={() => {
                    const group2000 = hairstyles[2000].find(
                      (data) => data.file === "img/logo5.png"
                    );
                    if (group2000) {
                      handleLogoClick(group2000.file2, group2000.file2Image);

                      setProduct(2000);
                    }
                  }}
                />
                <div
                  className="Stephen-Thomson"
                  style={{
                    position: "absolute",
                    top: "78%",
                    left: "51%",
                    transform: "translate(-50%, -50%)",
                    width: "190px",
                    height: "220px",
                    border: "none",
                    zIndex: 1,
                  }}
                  onClick={() => {
                    const group2000 = hairstyles[2000].find(
                      (data) => data.file === "img/logo12.png"
                    );
                    if (group2000) {
                      handleLogoClick(group2000.file2, group2000.file2Image);

                      setProduct(2000);
                    }
                  }}
                />
                <div
                  className="Tremont-Waters"
                  style={{
                    position: "absolute",
                    top: "78%",
                    left: "83%",
                    transform: "translate(-50%, -50%)",
                    width: "190px",
                    height: "220px",
                    border: "none",
                    zIndex: 1,
                  }}
                  onClick={() => {
                    const group2000 = hairstyles[2000].find(
                      (data) => data.file === "img/logo9.png"
                    );
                    if (group2000) {
                      handleLogoClick(group2000.file2, group2000.file2Image);

                      setProduct(2000);
                    }
                  }}
                />
                <div
                  className="Aleem-ford"
                  style={{
                    position: "absolute",
                    top: "94%",
                    left: "20%",
                    transform: "translate(-50%, -50%)",
                    width: "190px",
                    height: "220px",
                    border: "none",
                    zIndex: 1,
                  }}
                  onClick={() => {
                    const group2000 = hairstyles[2000].find(
                      (data) => data.file === "img/logo13.png"
                    );
                    if (group2000) {
                      handleLogoClick(group2000.file2, group2000.file2Image);

                      setProduct(2000);
                    }
                  }}
                />
                <div
                  className="Isaiah-Piñero"
                  style={{
                    position: "absolute",
                    top: "94%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "190px",
                    height: "220px",
                    border: "none",
                    zIndex: 1,
                  }}
                  onClick={() => {
                    const group2000 = hairstyles[2000].find(
                      (data) => data.file === "img/logo14.png"
                    );
                    if (group2000) {
                      handleLogoClick(group2000.file2, group2000.file2Image);

                      setProduct(2000);
                    }
                  }}
                />
                <div
                  className="Jose-Alvarado"
                  style={{
                    position: "absolute",
                    top: "94%",
                    left: "83%",
                    transform: "translate(-50%, -50%)",
                    width: "190px",
                    height: "220px",
                    border: "none",
                    zIndex: 1,
                  }}
                  onClick={() => {
                    const group2000 = hairstyles[2000].find(
                      (data) => data.file === "img/logo8.png"
                    );
                    if (group2000) {
                      handleLogoClick(group2000.file2, group2000.file2Image);

                      setProduct(2000);
                    }
                  }}
                />
              </div>
            )}
            {showGroupImage && (
              <div>
                <img src="/img/group.png" alt="group" />
                <div
                  className="group2-box"
                  style={{
                    position: "absolute",
                    top: "52%",
                    left: "55%",
                    transform: "translate(-50%, -50%)",
                    width: "450px",
                    height: "480px",
                    border: "none",
                    zIndex: 1,
                  }}
                  onClick={() => {
                    const group2000 = hairstyles[2000].find(
                      (data) => data.file === "img/logo2.png"
                    );
                    if (group2000) {
                      handleLogoClick(group2000.file2, group2000.file2Image);

                      setProduct(2000);
                    }
                  }}
                />
                <div
                  className="group3-box"
                  style={{
                    position: "absolute",
                    top: "82%",
                    left: "55%",
                    transform: "translate(-50%, -50%)",
                    width: "450px",
                    height: "480px",
                    border: "none",
                    zIndex: 1,
                  }}
                  onClick={() => {
                    const group2000 = hairstyles[2000].find(
                      (data) => data.file === "img/group.png"
                    );
                    if (group2000) {
                      handleLogoClick(group2000.file2, group2000.file2Image);

                      setProduct(2000);
                    }
                  }}
                />
              </div>
            )}
          </div>
        );
        break;
    }
    return html;
  };

  useEffect(() => {
    if (screenACtive === 3) {
      setTimeout(() => processPicture(), 9000);
    }

    if (screenACtive === 5) {
      setTimeout(() => {
        setScreenActive(7), exportAsImage();
      }, 5000);
    }
  }, [screenACtive]);

  useEffect(() => {
    webcamRef;
  }, []);

  return (
    <div className="container">
      {/* Screens [ START ] */}
      {screenACtive !== 5 && renderScreen()}
      {screenACtive === 5 && (
        <div id="miDiv">
          <div
            style={{
              width: "1080px",
              height: "1920px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            id="f"
          >
            <div
              className="image"
              style={{
                backgroundImage: ` url('/img/fondo.png'),url('${hairstyle}'),url('${image}')`,
                position: "absolute",
              }}
            />
          </div>
        </div>
      )}

      {screenACtive === 3 && (
        <>
          {!isCameraReady && (
            <div
              style={{
                width: "1080px",
                height: "1920px",
                backgroundSize: "cover",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="/img/carga.gif"
                alt="Cargando..."
                style={{
                  width: "400px",
                  height: "400px",
                  position: "absolute",
                }}
              />
            </div>
          )}
          <Webcam
            ref={webcamRef}
            onUserMedia={handleUserMedia}
            onUserMediaError={handleUserMediaError}
            mirrored={true}
            forceScreenshotSourceSize
            screenshotFormat="image/png"
            className="video-source"
            style={{
              display: `${isCameraReady ? "block" : "none"}`,
            }}
            videoConstraints={{
              width: 1920,
              height: 1080,
              frameRate: { ideal: 60, max: 60 },
            }}
          />
          <canvas
            ref={canvasRef}
            style={{ display: `${isCameraReady ? "block" : "none"}` }}
            className="appcanvas"
          />
          {isCameraReady && <img src={`/${hairstyle}`} alt="Jugadores" />}
        </>
      )}
      {/* Screens [ END ] */}
    </div>
  );
}

export default App;
