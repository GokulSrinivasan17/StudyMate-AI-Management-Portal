const { Resend } = require('resend');
const env = require('../config/env.config');

const resendApiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

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

const sendMail = async ({ to, subject, html, text }) => {
  const recipient = (to && to.trim()) || 'poovarasan420122@gmail.com';

  if (!recipient || !EMAIL_REGEX.test(recipient)) {
    console.error(`[email.service] Malformed recipient email: "${recipient}"`);
    return { success: false, error: `Invalid email address format: "${recipient}"` };
  }

  if (!resend || !resendApiKey) {
    console.error('[email.service] Missing RESEND_API_KEY in environment.');
    return { success: false, error: 'RESEND_API_KEY is missing in backend .env file.' };
  }

  const payload = {
    from: 'SmartEdu AI <onboarding@resend.dev>',
    to: recipient,
    subject: subject || 'SmartEdu AI Notification',
    html: html || `<p>${text}</p>`,
  };

  console.log('[email.service] Sending payload:', JSON.stringify(payload, null, 2));

  try {
    const { data, error } = await resend.emails.send(payload);

    if (error) {
      console.error('[email.service] Resend error:', JSON.stringify(error, null, 2));
      const errorMsg = error.message || error.name || JSON.stringify(error);
      return { success: false, error: errorMsg, rawError: error };
    }

    console.log('[email.service] Email sent, id:', data?.id);
    return { success: true, id: data?.id, messageId: data?.id, provider: 'Resend API' };
  } catch (err) {
    console.error('[email.service] Unexpected error:', err);
    return { success: false, error: err.message || 'Failed to send email' };
  }
};

const sendExamScheduleEmail = async (toEmail, studentName, schedule) => {
  const recipient = (toEmail && toEmail.trim()) || 'poovarasan420122@gmail.com';

  if (!recipient || !EMAIL_REGEX.test(recipient)) {
    console.error(`[email.service] Malformed recipient email: "${recipient}"`);
    return { success: false, error: `Invalid email address format: "${recipient}"` };
  }

  if (!resend || !resendApiKey) {
    console.error('[email.service] Missing RESEND_API_KEY in environment.');
    return { success: false, error: 'RESEND_API_KEY is missing in backend .env file.' };
  }

  const payload = {
    from: 'SmartEdu AI <onboarding@resend.dev>',
    to: recipient,
    subject: `Your AI Exam Revision Schedule, ${studentName || 'Student'}`,
    html: buildStudyPlanHtml(studentName, schedule),
  };

  console.log('[email.service] Sending payload:', JSON.stringify(payload, null, 2));

  try {
    const { data, error } = await resend.emails.send(payload);

    if (error) {
      console.error('[email.service] Resend response error:', JSON.stringify(error, null, 2));
      const errorMsg = error.message || error.name || JSON.stringify(error);
      return { success: false, error: errorMsg, rawError: error };
    }

    console.log('[email.service] Resend response data:', JSON.stringify(data, null, 2));
    console.log('[email.service] Email sent, id:', data?.id);
    return { success: true, id: data?.id, messageId: data?.id, provider: 'Resend API' };
  } catch (err) {
    console.error('[email.service] Unexpected error:', err);
    return { success: false, error: err.message || 'Failed to send email' };
  }
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
