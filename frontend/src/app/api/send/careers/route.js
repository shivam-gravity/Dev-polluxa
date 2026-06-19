import { CareersTemplate } from "@/components/email";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_RESEND_KEY);

export async function POST(request) {
  try {
    const formData = await request.formData();
    // Extract file data
    const resume = formData.get("files.resume");
    // Extract fields data
    const fields = formData.get("data");
    const formattedFields = JSON.parse(fields);
    const emailAddress = formattedFields?.CareersEmail;
    // Created a buffer for the file
    const readBuffer = await resume.arrayBuffer();
    const buffer = Buffer.from(readBuffer);
    const { data, error } = await resend.emails.send({
      from: "Careers - Ollkom <career@ollkom.com>",
      to: [emailAddress],
      subject: `Ollkom Careers form Submission - ${formattedFields?.FirstName}`,
      react: CareersTemplate(formattedFields),
      attachments: [
        {
          filename: resume.name,
          content: buffer,
        },
      ],
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
