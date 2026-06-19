import { Portal } from "@/components/ui";
import cx from "classnames";
import { useScrollLock } from "@/hooks";

const Modal = (props) => {
  const {
    open,
    onClose,
    children,
    disablePadding: disablePaddingProp = false,
    keepMounted = false,
    classes,
    variant,
  } = props;

  let disablePadding = disablePaddingProp;
  let DialogContent = "div";

  // to be refactored when the down bellow task is completed
  // @see https://chalhoub.atlassian.net/browse/LSRT-1545
  useScrollLock({ lock: open });

  if (!keepMounted && !open) return null;

  return (
    <Portal>
      <div
        className={cx("fixed inset-0 z-100 overflow-y-auto", {
          hidden: keepMounted && !open,
        })}
      >
        <div
          className={cx(
            "flex min-h-screen items-center justify-center px-4 pb-20 pt-4",
            classes?.root
          )}
        >
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <button
              className="absolute inset-0 bg-black opacity-50"
              onClick={onClose}
            >
              &#8203;
            </button>
          </div>
          <DialogContent
            className={cx(
              "relative inline-block w-full transform overflow-hidden shadow-xl",
              {
                "rounded-lg bg-white  sm:w-full sm:max-w-2xl":
                  variant !== "fancy",
                "max-w-md": variant === "fancy",
              },
              classes?.content
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <button
              className="absolute top-0 m-5 end-0"
              type="button"
              data-testid="close-button"
              onClick={onClose}
            >
              {"\u2715"}
            </button>
            <div
              className={cx("bg-white", {
                "px-4 pb-4 pt-5 sm:p-6 sm:pb-4": !disablePadding,
              })}
            >
              {children}
            </div>
          </DialogContent>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
