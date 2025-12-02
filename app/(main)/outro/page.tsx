"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";

export default function OutroPage() {
  const router = useRouter();
  const { url, setUrl } = useUser();

  function nextPage() {
    setUrl("");
    router.push("/");
  }
  return (
    <div
      className="outro h-screen w-screen flex justify-center items-center"
      onClick={nextPage}
    >
      <div className="p-2 bg-white absolute bottom-[630px] z-50">
        <QRCodeCanvas value={url} size={450} />
      </div>
    </div>
  );
}
