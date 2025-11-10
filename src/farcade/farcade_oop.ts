class EmailService {
  sendEmail(to: string, subject: string, body: string): void {
    console.log(`📧 Sending email to ${to}: ${subject}`);
  }
}

class SMSService {
  sendSMS(to: string, message: string): void {
    console.log(`📱 Sending SMS to ${to}: ${message}`);
  }
}

class PushService {
  sendPush(deviceId: string, message: string): void {
    console.log(`🔔 Sending push notification to ${deviceId}: ${message}`);
  }
}

class NotificationFacade {
  private emailService: EmailService;
  private smsService: SMSService;
  private pushService: PushService;

  constructor() {
    this.emailService = new EmailService();
    this.smsService = new SMSService();
    this.pushService = new PushService();
  }

  send(to: string, message: string, type: 'email' | 'sms' | 'push'): void {
    if (type === 'email') {
      this.emailService.sendEmail(to, 'Notification', message);
    } else if (type === 'sms') {
      this.smsService.sendSMS(to, message);
    } else {
      this.pushService.sendPush(to, message);
    }
  }
}

const notifier = new NotificationFacade();
notifier.send('user@example.com', 'Welcome!np', 'email');
notifier.send('+123456789', 'Your code is 1234', 'sms');
notifier.send('device-42', 'New message', 'push');

