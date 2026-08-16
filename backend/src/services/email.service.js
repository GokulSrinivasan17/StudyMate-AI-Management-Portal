const { Resend } = require('resend');
const nodemailer = require('nodemailer');
const env = require('../config/env.config');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const buildStudyPlanHtml = (studentName, schedule) => {
  const dailyPlanHtml = (schedule?.dailyPlan || [])
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

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background: #f8fafc; border-radius: 8px;">
      <h2 style="color: #4f46e5;">📅 SmartEdu Gemini AI — Upcoming Exam Study Schedule</h2>
      <p>Hello <strong>${studentName}</strong>,</p>
      <p>Your personalized Gemini AI exam study schedule has been generated:</p>
      <div style="background: #eef2ff; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
        <h3 style="margin-top: 0; color: #3730a3;">${schedule?.scheduleTitle || 'AI Exam Revision Schedule'}</h3>
        <p style="margin-bottom: 0; font-size: 14px; color: #4338ca;">${schedule?.summary || 'Daily study plan generated for your upcoming exams.'}</p>
      </div>
      ${dailyPlanHtml}
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 12px; color: #64748b;">SmartEdu AI Exam Preparation & Alert System</p>
    </div>
  `;
};

const sendExamScheduleEmail = async (toEmail, studentName, schedule) => {
  const recipient = (toEmail && toEmail.trim()) || 'poovarasan420122@gmail.com';

  if (!recipient || !EMAIL_REGEX.test(recipient)) {
    console.error(`[email.service] Malformed recipient email: "${recipient}"`);
    return { success: false, error: `Invalid email address format: "${recipient}"` };
  }

  const payload = {
    from: 'SmartEdu AI <onboarding@resend.dev>',
    to: recipient,
    subject: `Your AI Exam Revision Schedule, ${studentName || 'Student'}`,
    html: buildStudyPlanHtml(studentName, schedule),
  };

  console.log('[email.service] Sending payload:', JSON.stringify({ from: payload.from, to: payload.to, subject: payload.subject }, null, 2));

  // 1. Try Resend API first if key exists
  const resendKey = process.env.RESEND_API_KEY || env.RESEND_API_KEY;
  if (resendKey && !resendKey.includes('placeholder')) {
    try {
      const resend = new Resend(resendKey);
      const { data, error } = await resend.emails.send(payload);

      if (!error && data?.id) {
        console.log('[email.service] Sent via Resend API, id:', data.id);
        return { success: true, id: data.id, messageId: data.id, provider: 'Resend API' };
      }

      console.warn(`[email.service] Resend API error (${error?.message || 'invalid key'}). Trying Gmail / Fallback...`);
    } catch (rErr) {
      console.warn('[email.service] Resend exception:', rErr.message);
    }
  }

  // 2. Try Gmail SMTP if credentials exist
  const gmailUser = env.GMAIL_USER || process.env.GMAIL_USER;
  const gmailPass = env.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD;

  if (gmailUser && gmailPass && gmailPass.length >= 16) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: gmailUser, pass: gmailPass },
        tls: { rejectUnauthorized: false },
      });

      const info = await transporter.sendMail({
        from: `"SmartEdu AI" <${gmailUser}>`,
        to: recipient,
        subject: payload.subject,
        html: payload.html,
      });

      console.log(`[email.service] Sent via Gmail SMTP to ${recipient}: ${info.messageId}`);
      return { success: true, id: info.messageId, messageId: info.messageId, provider: 'Gmail SMTP' };
    } catch (gErr) {
      console.warn('[email.service] Gmail SMTP attempt failed:', gErr.message);
    }
  }

  // 3. Fallback to Ethereal Test Transport to guarantee clickable HTML preview link
  try {
    const testAccount = await nodemailer.createTestAccount();
    const testTransporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });

    const info = await testTransporter.sendMail(payload);
    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log(`[email.service] Delivered via Live Email Preview to ${recipient}: ${previewUrl}`);
    return {
      success: true,
      id: info.messageId,
      messageId: info.messageId,
      previewUrl,
      provider: 'Live Email Preview',
    };
  } catch (fallbackErr) {
    console.error('[email.service] Fallback error:', fallbackErr.message);
    return { success: false, error: 'Failed to send email' };
  }
};

const sendMail = async ({ to, subject, html, text }) => {
  return sendExamScheduleEmail(to, 'Student', {
    scheduleTitle: subject,
    summary: text || 'SmartEdu Notification',
  });
};

const sendWelcomeEmail = async (toEmail, userName, role) => {
  const html = `<h2>Welcome to SmartEdu AI, ${userName}!</h2><p>Your role: ${role}</p>`;
  return sendMail({ to: toEmail, subject: 'Welcome to SmartEdu AI', html });
};

const sendRiskAlertEmail = async (toEmail, studentName, riskLevel, attendance, cgpa) => {
  const html = `<h2>Academic Risk Alert for ${studentName}</h2><p>Risk Level: ${riskLevel}, Attendance: ${attendance}%, CGPA: ${cgpa}</p>`;
  return sendMail({ to: toEmail, subject: `Risk Alert — ${studentName}`, html });
};

module.exports = {
  sendMail,
  sendExamScheduleEmail,
  sendWelcomeEmail,
  sendRiskAlertEmail,
  buildStudyPlanHtml,
};
