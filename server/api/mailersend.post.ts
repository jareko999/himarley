import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiKey = config.mailersend.apiKey;

  const { email, name, description } = await readBody(event);

  const mailerSend = new MailerSend({ apiKey });

  const sentFrom = new Sender("jarek@distromade.com", "We build AI apps");
  const recipients = [new Recipient("jarek@distromfg.com", "Jarek")];

  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Description:</strong><br/>${description.replace(/\n/g, "<br/>")}</p>
  `;

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(new Sender(email, name))
    .setSubject("New Contact Form Submission")
    .setHtml(html);

  await mailerSend.email.send(emailParams);

  return { success: true };
});
