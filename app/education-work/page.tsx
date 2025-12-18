import "../page.css";

export default function EducationWorkPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-12 lg:p-24">
      <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[75%] border border-white/20 rounded-[20px] backdrop-blur-[10px] p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] floating-container animate-fade-in-up">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white text-stroke mb-4">
          Education & Work
        </h1>
        <p className="text-base md:text-lg text-gray-100 leading-relaxed">
          This is the Education & Work page. You can describe your education background and work experience here.
        </p>
      </div>
    </div>
  );
}

