import "../page.css";

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6">
      <div className="w-full max-w-[95%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] xl:max-w-[60%] floating-container animate-fade-in-up">
        <h1 className="text-lg md:text-xl lg:text-2xl font-extrabold text-white text-stroke mb-2">
          Projects
        </h1>
        <p className="text-[11px] md:text-xs text-gray-100 leading-relaxed">
          This is the Projects page. You can showcase your personal and professional projects here.
        </p>
      </div>
    </div>
  );
}

