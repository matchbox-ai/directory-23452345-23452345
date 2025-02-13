import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

interface NotifyMeSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
}

interface ClinicContactSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  clinicName: string;
  clinicLocation: string;
  message?: string;
}

export async function sendNotifyMeEmail(submission: NotifyMeSubmission) {
  const html = `
    <h2>New Location Interest Notification</h2>
    <p>Someone has expressed interest in dental practices in ${submission.location}</p>
    <h3>Contact Details:</h3>
    <ul>
      <li>Name: ${submission.firstName} ${submission.lastName}</li>
      <li>Email: ${submission.email}</li>
      <li>Phone: ${submission.phone}</li>
    </ul>
    <p>Location of Interest: ${submission.location}</p>
  `;

  try {
    await mailService.send({
      to: 'manoj@toothlens.com',
      from: 'notifications@toothlens.com', // Replace with your verified sender
      subject: `New Location Interest: ${submission.location}`,
      html,
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendClinicContactEmail(submission: ClinicContactSubmission) {
  const html = `
    <h2>New Clinic Contact Request</h2>
    <p>Someone has requested information about ${submission.clinicName}</p>
    <h3>Contact Details:</h3>
    <ul>
      <li>Name: ${submission.firstName} ${submission.lastName}</li>
      <li>Email: ${submission.email}</li>
      <li>Phone: ${submission.phone}</li>
    </ul>
    <h3>Clinic Details:</h3>
    <ul>
      <li>Clinic Name: ${submission.clinicName}</li>
      <li>Location: ${submission.clinicLocation}</li>
    </ul>
    ${submission.message ? `<h3>Message:</h3><p>${submission.message}</p>` : ''}
  `;

  try {
    await mailService.send({
      to: 'manoj@toothlens.com',
      from: 'notifications@toothlens.com', // Replace with your verified sender
      subject: `New Contact Request: ${submission.clinicName}`,
      html,
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}
