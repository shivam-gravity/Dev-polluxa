import { ContactTemplate } from "@/components/email";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_RESEND_KEY);

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      FirstName,
      marketingEmail,
      logisticsEmail,
      retailEmail,
      Department,
    } = body;

    /* const emailAddress =
      {
        marketing: marketingEmail,
        logistics: logisticsEmail,
        retail: retailEmail,
      }[Department] || marketingEmail; */

    const emailAddress = "info@ollkom.com";

    const { data, error } = await resend.emails.send({
      from: "Contact - Ollkom <info@ollkom.com>",
      to: [emailAddress],
      subject: `Ollkom Contact form Submission - ${FirstName}`,
      react: ContactTemplate(body),
    });

    if (error) {
      console.log(error);
      return Response.json({ error });
    }
    return Response.json({ data });
  } catch (error) {
    return Response.json({ error });
  }
}
