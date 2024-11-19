import nodemailer from "nodemailer";

// Email transporter oluşturma
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Gmail adresiniz
    pass: process.env.EMAIL_PASS, // Gmail uygulama şifreniz
  },
});

export async function POST(req) {
  try {
    const data = await req.json();
    const { name, email, phone, message } = data;

    // Email şablonu
    const emailTemplate = `
      <h2>Yeni İletişim Formu Mesajı</h2>
      <p><strong>Gönderen:</strong> ${name}</p>
      <p><strong>E-posta:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone || "Belirtilmedi"}</p>
      <p><strong>Mesaj:</strong></p>
      <p>${message}</p>
    `;

    // Email gönderme ayarları
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL, // Alıcı email adresi
      subject: "Yeni İletişim Formu Mesajı",
      html: emailTemplate,
    };

    // Email gönderme
    await transporter.sendMail(mailOptions);

    return Response.json({
      success: true,
      message: "Mesajınız başarıyla gönderildi.",
    });
  } catch (error) {
    console.error("Email gönderme hatası:", error);
    return Response.json(
      {
        success: false,
        message: "Mesaj gönderilirken bir hata oluştu.",
      },
      {
        status: 500,
      }
    );
  }
}
