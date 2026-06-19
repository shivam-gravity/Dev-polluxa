import { Link } from "@/i18n/routing";
import { Button, Typography } from "@/components/ui";
import { GlassHour } from "@/assets/images";

export default function ComingSoon() {
  return (
    <section className="bg-[#F9F9F9] min-h-screen flex items-center justify-center">
      <div className="container-custom mx-auto px-5 md:px-0 text-center">
        <GlassHour className="mx-auto" />
        <Typography variant="heading1" className="text-[#003464] mb-4">
          Coming Soon!
        </Typography>
        <p className="text-[#003464] mb-8 max-w-[600px] mx-auto">
          Stay tuned as we roll out more innovative products soon. Exciting
          updates are on the way!
        </p>
        <Link href="/" className="inline-block">
          <Button variant="primary">Home</Button>
        </Link>
      </div>
    </section>
  );
}
