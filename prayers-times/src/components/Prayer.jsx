export default function Prayer({ time, children }) {
  return (
    <span className="p-2 bg-slate-500 mb-2 flex justify-center">
      {time} :{children}
    </span>
  );
}
