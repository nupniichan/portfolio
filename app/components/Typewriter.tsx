 "use client";

 import { useEffect, useState } from "react";

 const MESSAGES = [
   "Rất vui được gặp cậu (≧∇≦)/",
   "は じ め ま し て (≧∇≦)/",
   "Nice to meet you (≧∇≦)/",
 ];

 const TYPING_SPEED = 90;
 const ERASING_SPEED = 60;
 const PAUSE_AFTER_TYPED = 1200;

 export default function Typewriter() {
   const [messageIndex, setMessageIndex] = useState(0);
   const [text, setText] = useState("");
   const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = MESSAGES[messageIndex];

    if (!isDeleting && text === fullText) {
      const pauseTimeout = setTimeout(() => {
        setIsDeleting(true);
      }, PAUSE_AFTER_TYPED);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting && text === "") {
      // Use setTimeout to avoid synchronous state updates
      setTimeout(() => {
        setIsDeleting(false);
        setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
      }, 0);
      return;
    }

    const timer = setTimeout(
      () => {
        setText((prev) => {
          if (isDeleting) {
            return prev.slice(0, -1);
          }
          return fullText.slice(0, prev.length + 1);
        });
      },
      isDeleting ? ERASING_SPEED : TYPING_SPEED,
    );

    return () => clearTimeout(timer);
  }, [text, isDeleting, messageIndex]);

   return (
     <div className="text-center text-lg sm:text-xl md:text-2xl font-bold text-white text-stroke">
       <span className="border-r-2 border-white pr-1">
         {text}
       </span>
     </div>
   );
 }

