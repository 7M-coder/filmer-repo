export default function Prayer({ time, children, background, position }) {
  return (
    <span
      className="p-2 h-16 text-white flex flex-col justify-center text-lg font-bold rounded-md"
      style={{
        backgroundImage: `url('../../public/imgs/${background}')`,
        backgroundPosition: position,
        backgroundSize: "cover",
      }}
    >
      <div
        className="text-2xl"
        style={{
          textShadow: "1px 1px 2px black",
        }}
      >
        {children}
      </div>
      <div
        className="flex justify-end md:text-xl"
        style={{
          textShadow: "1px 1px 2px black",
        }}
      >
        {time}
      </div>
    </span>
  );
}
