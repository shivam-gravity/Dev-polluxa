import cx from "classnames";

const genericHamburgerLine = `block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out`;

const HamburgerButton = (props) => {
  const { open, setOpen } = props;
  return (
    <button
      className=" w-10 h-10 relative focus:outline-none"
      onClick={() => setOpen(!open)}
    >
      <div className="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
        <span
          className={cx(`${genericHamburgerLine}`, {
            "rotate-45": open,
            "-translate-y-1.5": !open,
          })}
        />
        <span
          className={cx(`${genericHamburgerLine}`, {
            "opacity-0": open,
            "opacity-100": !open,
          })}
        />
        <span
          className={cx(`${genericHamburgerLine}`, {
            "-rotate-45": open,
            "translate-y-1.5": !open,
          })}
        />
      </div>
    </button>
  );
};

export default HamburgerButton;
