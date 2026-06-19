import { Typography } from "@/components/ui";

const SectionHeader = ({ title, description }) => (
  <div className="text-center">
    {title && (
      <Typography variant="title" className="tracking-widest">
        {title}
      </Typography>
    )}
    {description && <Typography variant="heading1">{description}</Typography>}
  </div>
);

export default SectionHeader;
