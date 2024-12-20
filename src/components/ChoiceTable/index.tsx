import classnames from "classnames";

const ChoiceTable = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={classnames("pb-12", className)}>
      <div className="px-5 flex justify-around align-middle gap-10">
        {children}
      </div>
      <div className="absolute z-10 bottom-0 flex justify-center items-center bg-green-600 h-[200px] w-full border-b-green-800 border-b-[20px]">
        <div className="absolute top-1/4 z-20 -bottom-14 w-full bg-white blur-xs opacity-20 rounded-[50%]"></div>
      </div>
    </div>
  );
};

export default ChoiceTable;
