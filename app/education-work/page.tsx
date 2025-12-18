import "../page.css";

export default function EducationWorkPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6">
      <div className="w-full max-w-[95%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] xl:max-w-[60%] border border-white/20 rounded-[10px] backdrop-blur-[10px] p-4 md:p-5 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] floating-container animate-fade-in-up">
        <h1 className="text-lg md:text-xl lg:text-2xl font-extrabold text-white text-stroke mb-2">
          Education & Work
        </h1>
        <p className="text-[11px] md:text-xs text-gray-100 leading-relaxed">
          This is the Education & Work page. You can describe your education background and work experience here.
        </p>
      </div>
    </div>
  );
}

