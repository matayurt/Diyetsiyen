import { mailConfig } from "@/config/mail";

export async function sendContactMail({ name, email, phone, message }) {
  const emailTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #8aa542; border-bottom: 2px solid #8aa542; padding-bottom: 10px;">
        Yeni İletişim Formu Mesajı
      </h2>
      
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 10px 0;">
          <strong>Gönderen:</strong> ${name}
        </p>
        <p style="margin: 10px 0;">
          <strong>E-posta:</strong> ${email}
        </p>
        <p style="margin: 10px 0;">
          <strong>Telefon:</strong> ${phone || "Belirtilmedi"}
        </p>
        <p style="margin: 10px 0;">
          <strong>Mesaj:</strong>
        </p>
        <p style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 5px;">
          ${message}
        </p>
      </div>
      
      <div style="color: #666; font-size: 12px; margin-top: 20px; padding-top: 10px; border-top: 1px solid #eee;">
        <p>Bu mail iletişim formu aracılığıyla gönderilmiştir.</p>
      </div>
    </div>
  `;

  const mailOptions = {
    ...mailConfig.defaultMailOptions,
    subject: "Yeni İletişim Formu Mesajı",
    html: emailTemplate,
    replyTo: email,
  };

  try {
    await mailConfig.transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Mail gönderme hatası:", error);
    throw new Error("Mail gönderilemedi");
  }
}

// Validation fonksiyonları
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone) {
  // Türkiye telefon formatı için basit bir regex
  const phoneRegex = /^(\+90|0)?[0-9]{10}$/;
  return !phone || phoneRegex.test(phone.replace(/\s/g, ""));
}

export function validateContactForm({ name, email, message, phone }) {
  const errors = [];

  if (!name || name.length < 2) {
    errors.push("Geçerli bir isim giriniz");
  }

  if (!email || !validateEmail(email)) {
    errors.push("Geçerli bir e-posta adresi giriniz");
  }

  if (!message || message.length < 10) {
    errors.push("Mesajınız en az 10 karakter olmalıdır");
  }

  if (phone && !validatePhone(phone)) {
    errors.push("Geçerli bir telefon numarası giriniz");
  }

  return errors;
}
