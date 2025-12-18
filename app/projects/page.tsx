import "../page.css";

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-12 lg:p-24">
      <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[75%] floating-container animate-fade-in-up">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white text-stroke mb-4">
          Projects
        </h1>
        <p className="text-base md:text-lg text-gray-100 leading-relaxed">
          This is the Projects page. You can showcase your personal and professional projects here.
        </p>
      </div>
    </div>
  );
}

