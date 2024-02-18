import classNames from "classnames";

export type AlertBoxProps = {
  type: "success" | "warning" | "error" | "info";
  title: string;
  body: React.ReactNode;
};

const alertTypeStyles = {
  success: "bg-green-200 text-green-800",
  warning: "bg-yellow-200 text-yellow-800",
  error: "bg-red-200 text-red-800",
  info: "bg-blue-200 text-blue-800",
};

const AlertBox: React.FC<AlertBoxProps> = ({ type, title, body }) => {
  const boxColor = classNames({
    "bg-green-100 border-green-200 text-green-600": type === "success",
    "bg-yellow-100 border-yellow-200 text-yellow-600": type === "warning",
    "bg-red-100 border-red-200 text-red-600": type === "error",
    "bg-blue-100 border-blue-200 text-blue-600": type === "info",
  });
  return (
    <div
      className={`mb-10 p-4 shadow-md border-2 border-l-4 border-r-8 ${boxColor} flex flex-col`}
    >
      <h3 className="font-bold p-0 m-0">{title}</h3>
      <div className="mt-2 italic">{body}</div>
    </div>
  );
};

export default AlertBox;
