import reactLogo from "./assets/react.svg";

export default function Header(props: { title: string }) {
  return (
    <div className="flex  gap-2 items-center">
      <img
        src={reactLogo}
        className="animated-spin h-13 w-13"
        alt="logo"
        style={{ animation: "spin 2s linear infinite" }}
      />
      <div className="flex gap-2 items-center">
        {[
          { page: "Home", url: "/" },
          { page: "About", url: "/about" },
        ].map((link) => (
          <a
            key={link.url}
            href={link.url}
            className="text-gray-800 p-2 m-2 uppercase"
          >
            {link.page}
          </a>
        ))}
      </div>
    </div>
  );
}
