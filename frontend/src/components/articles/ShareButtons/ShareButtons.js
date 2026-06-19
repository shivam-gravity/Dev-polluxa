import {
  IconCopyUrl,
  IconFacebook,
  IconLinkedin,
  IconX,
} from "@/assets/images";
import cx from "classnames";

const ShareButtons = ({ className = "" }) => {
  return (
    <div className={cx("flex flex-col gap-4", className)}>
      <button className="w-10 h-10 bg-[#D9D9D9] rounded-full flex items-center justify-center transition-colors">
        <IconLinkedin />
      </button>
      <button className="w-10 h-10 bg-[#D9D9D9] rounded-full flex items-center justify-center transition-colors">
        <IconX />
      </button>
      <button className="w-10 h-10 bg-[#D9D9D9] rounded-full flex items-center justify-center transition-colors">
        <IconFacebook />
      </button>
      <button className="w-10 h-10 bg-[#D9D9D9] rounded-full flex items-center justify-center transition-colors">
        <IconCopyUrl />
      </button>
    </div>
  );
};

export default ShareButtons;
