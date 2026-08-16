const nodemailer = require('nodemailer');
const env = require('../config/env.config');

const sendMail = async ({ to, subject, html, text }) => {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    const mailOptions = {
      from: `"SmartEdu AI Portal" <${env.EMAIL_USER}>`,
      to,
      subject,
      text: text || html.replace(/<[^>]*>?/gm, ''),
      html,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent via Gmail SMTP to ${to}: ${info.messageId}`);
      return { success: true, messageId: info.messageId, provider: 'Gmail SMTP' };
    } catch (gmailError) {
      console.warn('Gmail SMTP Auth failed. Falling back to Ethereal Live Test Transport:', gmailError.message);
      
      const testAccount = await nodemailer.createTestAccount();
      const testTransporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      const info = await testTransporter.sendMail(mailOptions);
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log(`Email delivered via Ethereal SMTP! Preview URL: ${previewUrl}`);
      return { success: true, messageId: info.messageId, previewUrl, provider: 'Ethereal Live Preview' };
    }
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

const sendExamScheduleEmail = async (toEmail, studentName, schedule) => {
  const dailyPlanHtml = (schedule.dailyPlan || [])
    .map(
      (item) => `
      <div style="margin-bottom: 12px; padding: 12px; background: #ffffff; border-left: 4px solid #4f46e5; border-radius: 4px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
        <strong style="color: #1e1b4b;">${item.day} (${item.date}) — ${item.focusSubject}</strong>
        <p style="margin: 4px 0 0; font-size: 13px; color: #475569;">Target Duration: ${item.recommendedDuration}</p>
        <ul style="margin: 6px 0 0 16px; padding: 0; font-size: 13px; color: #334155;">
          ${(item.tasks || []).map((t) => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    `
    )
    .join('');

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background: #f8fafc; border-radius: 8px;">
      <h2 style="color: #4f46e5;">📅 SmartEdu Gemini AI — Upcoming Exam Study Schedule</h2>
      <p>Hello <strong>${studentName}</strong>,</p>
      <p>Your personalized Gemini AI exam study schedule has been generated:</p>
      <div style="background: #eef2ff; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
        <h3 style="margin-top: 0; color: #3730a3;">${schedule.scheduleTitle}</h3>
        <p style="margin-bottom: 0; font-size: 14px; color: #4338ca;">${schedule.summary}</p>
      </div>
      ${dailyPlanHtml}
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 12px; color: #64748b;">SmartEdu AI Exam Preparation & Alert System</p>
    </div>
  `;

  return sendMail({
    to: toEmail,
    subject: `📅 AI Exam Study Schedule & Daily Reminders — ${studentName}`,
    html,
  });
};

module.exports = {
  sendMail,
  sendWelcomeEmail,
  sendRiskAlertEmail,
  sendExamScheduleEmail,
};
