interface IButtonWithProgress {
  className?: string;
  disabled: boolean;
  text: string;
  pendingApiCall: boolean;
  onClick: () => void;
}

export function ButtonWithProgress({
  className,
  disabled,
  pendingApiCall,
  text,
  onClick,
}: IButtonWithProgress) {
  return (
    <button
      className={className || "w-100 btn btn-lg btn-primary mb-3"}
      onClick={onClick}
      disabled={disabled}
    >
      {pendingApiCall && (
        <div
          className="spinner-border text-light-spinner spinner-border-sm mr-sm-1"
          role="status"
        >
          <span className="visually-hidden">Aguarde...</span>
        </div>
      )}
      &nbsp; {text}
    </button>
  );
}
