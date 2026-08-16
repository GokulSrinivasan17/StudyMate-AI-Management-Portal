const nodemailer = require('nodemailer');
const env = require('../config/env.config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

const sendMail = async ({ to, subject, html, text }) => {
  try {
    if (!env.EMAIL_USER || !env.EMAIL_PASS) {
      console.warn('Email credentials not configured');
      return { success: false, message: 'Email credentials not set' };
    }

    const mailOptions = {
      from: `"SmartEdu AI Portal" <${env.EMAIL_USER}>`,
      to,
      subject,
      text: text || html.replace(/<[^>]*>?/gm, ''),
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send email:', error.message);
    return { success: false, error: error.message };
  }
};

const sendWelcomeEmail = async (toEmail, userName, role) => {
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background: #f8fafc; border-radius: 8px;">
      <h2 style="color: #4f46e5;">Welcome to SmartEdu AI Portal!</h2>
      <p>Hello <strong>${userName}</strong>,</p>
      <p>Your account has been successfully registered with the role: <strong>${role}</strong>.</p>
      <p>You can now log in to your dashboard and access real-time academic tracking, AI insights, attendance monitoring, and coursework management.</p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 12px; color: #64748b;">SmartEdu AI — Education Management & Intelligence System</p>
    </div>
  `;

  return sendMail({
    to: toEmail,
    subject: 'Welcome to SmartEdu AI Education Portal',
    html,
  });
};

const sendRiskAlertEmail = async (toEmail, studentName, riskLevel, attendance, cgpa, weakSubjects = []) => {
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px;">
      <h2 style="color: #dc2626;">🚨 SmartEdu AI — Academic Risk Alert</h2>
      <p>Dear <strong>${studentName}</strong> (or Parent/Guardian),</p>
      <p>Our academic AI monitoring system has flagged a potential performance risk:</p>
      <ul>
        <li><strong>Risk Level:</strong> <span style="color: #dc2626; font-weight: bold;">${riskLevel}</span></li>
        <li><strong>Attendance Rate:</strong> ${attendance}%</li>
        <li><strong>Current CGPA:</strong> ${cgpa}</li>
        ${weakSubjects.length > 0 ? `<li><strong>Subjects Needing Attention:</strong> ${weakSubjects.join(', ')}</li>` : ''}
      </ul>
      <p>We strongly recommend scheduling a meeting with your class coordinator to receive personalized academic support.</p>
      <hr style="border: 0; border-top: 1px solid #fca5a5; margin: 20px 0;" />
      <p style="font-size: 12px; color: #991b1b;">SmartEdu AI Automated Intelligence Engine</p>
    </div>
  `;

  return sendMail({
    to: toEmail,
    subject: `🚨 SmartEdu Academic Risk Alert — ${studentName}`,
    html,
  });
};

module.exports = {
  sendMail,
  sendWelcomeEmail,
  sendRiskAlertEmail,
};
