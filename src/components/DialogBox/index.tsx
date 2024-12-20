"use client";

import classnames from "classnames";

type Action = {
  content: string;
  onClick: () => void;
};

export type DialogBoxProps = {
  children?: React.ReactNode;
  actionContent?: string;
  onClick?: () => void;
  className?: string;
  // @todo: Deprecate the single action and click props.
  actions?: Action[];
};

const DialogBox = ({
  children,
  onClick,
  actionContent,
  className,
  actions,
}: DialogBoxProps) => {
  return (
    <div
      className={classnames(
        "dialog min-h-20 flex justify-start items-end text-black",
        className,
      )}
    >
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
      {actions?.length && (
        <div className="dialog w-1/2 flex flex-col justify-start items-start">
          {actions.map((action, index) => (
            <button
              key={index}
              className="catch-it-button"
              onClick={() => action.onClick()}
            >
              {action.content.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DialogBox;
