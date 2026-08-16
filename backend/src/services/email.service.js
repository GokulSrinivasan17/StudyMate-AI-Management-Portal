const nodemailer = require('nodemailer');
const env = require('../config/env.config');

const sendMail = async ({ to, subject, html, text }) => {
  const recipient = (to && to.trim()) || 'poovarasan420122@gmail.com';
  const gmailUser = env.GMAIL_USER || process.env.GMAIL_USER || 'studymate.hackathon@gmail.com';
  const gmailPass = env.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD || 'Study@2026';

  console.log(`📧 [EMAIL SERVICE] Preparing email send:`);
  console.log(`   From: ${gmailUser}`);
  console.log(`   To: ${recipient}`);
  console.log(`   Subject: ${subject}`);

  if (!gmailUser || !gmailPass) {
    console.error(`❌ [EMAIL SERVICE ERROR] Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment.`);
    return {
      success: false,
      error: 'Gmail SMTP configuration is incomplete. GMAIL_USER and GMAIL_APP_PASSWORD must be configured in backend .env.',
    };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
    tls: { rejectUnauthorized: false },
  });

  const mailOptions = {
    from: `"SmartEdu AI Portal" <${gmailUser}>`,
    to: recipient,
    subject,
    text: text || html.replace(/<[^>]*>?/gm, ''),
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ [EMAIL SERVICE SUCCESS] Message sent via Gmail SMTP:`);
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   SMTP Response: ${info.response}`);

    return {
      success: true,
      messageId: info.messageId,
      smtpResponse: info.response,
      provider: 'Gmail SMTP',
    };
  } catch (err) {
    console.error(`❌ [EMAIL SERVICE ERROR] Nodemailer sendMail failed:`);
    console.error(`   Error Message: ${err.message}`);
    console.error(`   Error Code: ${err.code}`);
    console.error(`   Response Code: ${err.responseCode}`);
    console.error(`   SMTP Response: ${err.response}`);

    let clientError = 'Failed to send email. Please check target email address.';
    if (err.code === 'EAUTH' || err.responseCode === 535) {
      clientError = 'Gmail SMTP authentication failed. A 16-character Google App Password (not the account password) is required in .env.';
      console.error(`💡 [HINT] Google disabled standard account password logins for Nodemailer. Please generate a 16-character App Password at myaccount.google.com/apppasswords with 2FA enabled, and set GMAIL_APP_PASSWORD in .env.`);
    }

    return {
      success: false,
      error: clientError,
      errorCode: err.code,
    };
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
