export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-center text-sm font-medium text-slate-500">
      <p>
        © {new Date().getFullYear()} JobTailor. Next-Generation AI Tools by RP
        Tech.
      </p>
      <p className="mt-3">
        Built by <span className="font-semibold">Rupesh Patil</span> |{" "}
        <a
          href="https://github.com/rupeshpatil27"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          GitHub
        </a>{" "}
        |{" "}
        <a
          href="https://www.linkedin.com/in/rupesh-patil-ab8917230/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          LinkedIn
        </a>
      </p>
    </footer>
  );
};
