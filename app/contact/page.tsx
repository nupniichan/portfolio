import "../page.css";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6">
      <div className="w-full max-w-[95%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] xl:max-w-[60%] bg-black/50 border border-white/20 rounded-[10px] backdrop-blur-xs p-2 sm:p-3 md:p-4 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] floating-container animate-fade-in-up">
        <h1 className="text-lg md:text-xl lg:text-2xl font-extrabold text-white text-stroke mb-2">
          Contact
        </h1>
        <p className="text-[11px] md:text-xs text-gray-100 leading-relaxed">
          This is the Contact page. You can put your contact information or a contact form here.
        </p>
      </div>
    </div>
  );
}

