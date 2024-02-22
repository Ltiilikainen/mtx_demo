import dotenv from "dotenv";
import Mailjet from "node-mailjet";
import errorLogger from "./logger";

dotenv.config();

const adminEmail = process.env.MJ_ADMIN_DELIVERY_ADDRESS;

const template = process.env.MJ_CONTACT_TEMPLATE;

const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE
});

export async function sendContactForm(formData: ContactFormData) {
  console.log(template);
  console.log(mailjet);
  console.log(formData);
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          email: adminEmail,
          name: "Portfolio Admin"
        },
        To: [
          {
            email: adminEmail,
            name: `${formData.name} via Portfolio Admin`
          }
        ],
        TemplateID: parseInt(template || ""),
        TemplateLanguage: true,
        Subject: `New Inquiry from ${formData.name}`,
        Variables: {
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          purpose: formData.purpose,
          startDate:
            formData.startDate !== ""
              ? Date.parse(formData.startDate).toLocaleString()
              : "",
          endDate:
            formData.endDate !== ""
              ? Date.parse(formData.endDate).toLocaleString()
              : "",
          body: formData.body
        }
      }
    ]
  });

  request
    .then(() => {
      return;
    })
    .catch((err: Error) => errorLogger.log("error", err.message));
}
