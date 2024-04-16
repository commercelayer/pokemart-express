"use client";

export type DialogBoxProps = {
  children?: React.ReactNode;
  actionContent?: string;
  onClick?: () => void;
};

const DialogBox = ({ children, onClick, actionContent }: DialogBoxProps) => {
  return (
    <div className="dialog min-h-20 flex justify-start items-end">
      <span className="font-pixel text-base self-end w-1/2 p-1">
        {children}
      </span>
      {onClick && actionContent && (
        <div className="dialog w-1/2 flex justify-start">
          <button className="catch-it-button" onClick={() => onClick()}>
            {actionContent.toUpperCase()}
          </button>
        </div>
      )}
    </div>
  );
};

export default DialogBox;
