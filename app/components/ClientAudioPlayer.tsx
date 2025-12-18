 "use client";

import dynamic from "next/dynamic";

const AudioPlayer = dynamic(() => import("./AudioPlayer"), {
  ssr: false,
  loading: () => null,
});

export default function ClientAudioPlayer() {
  return <AudioPlayer />;
}

