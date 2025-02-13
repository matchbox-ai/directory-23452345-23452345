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

export async function sendNotifyMeEmail(submission: NotifyMeSubmission): Promise<boolean> {
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
    console.log('Sending notify-me email to:', 'manoj@toothlens.com');
    const msg = {
      to: 'manoj@toothlens.com',
      from: 'notifications@toothlens.com',
      subject: `New Location Interest: ${submission.location}`,
      html,
    };

    await mailService.send(msg);
    console.log('Notify-me email sent successfully');
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    if (error.response) {
      console.error('SendGrid API response:', error.response.body);
    }
    return false;
  }
}

export async function sendClinicContactEmail(submission: ClinicContactSubmission): Promise<boolean> {
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
    console.log('Sending clinic contact email to:', 'manoj@toothlens.com');
    const msg = {
      to: 'manoj@toothlens.com',
      from: 'notifications@toothlens.com',
      subject: `New Contact Request: ${submission.clinicName}`,
      html,
    };

    await mailService.send(msg);
    console.log('Clinic contact email sent successfully');
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    if (error.response) {
      console.error('SendGrid API response:', error.response.body);
    }
    return false;
  }
}