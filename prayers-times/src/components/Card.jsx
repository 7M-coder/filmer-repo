const cardStyle = {
  boxShadow: "0px 2px 7px 2px rgba(230,230,230,1)",
  border: "1px solid #e8e7e7",
};

export default function Card({ children }) {
  return (
    <div
      className="bg-white flex text-3xl font-bold rounded-md p-2"
      style={cardStyle}
    >
      {children}
    </div>
  );
}
