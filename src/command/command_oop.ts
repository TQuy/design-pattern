// Command interface — all commands look the same
interface Command {
  execute(): Promise<void>;
}

// Receiver classes: actual logic lives here
class EmailService {
  async send(to: string, subject: string) {
    console.log(`📧 Sending email to ${to}: ${subject}`);
  }
}

class ReportService {
  async generate(type: string) {
    console.log(`📊 Generating ${type} report`);
  }
}

// Concrete Commands
class SendEmailCommand implements Command {
  constructor(private emailService: EmailService, private to: string, private subject: string) { }

  async execute() {
    await this.emailService.send(this.to, this.subject);
  }
}

class GenerateReportCommand implements Command {
  constructor(private reportService: ReportService, private type: string) { }

  async execute() {
    await this.reportService.generate(this.type);
  }
}

// Invoker — the task queue
class TaskQueue {
  private queue: Command[] = [];

  addTask(command: Command) {
    this.queue.push(command);
  }

  async run() {
    for (const cmd of this.queue) {
      await cmd.execute();
    }
  }
}

// 🧪 Usage
(async () => {
  const emailService = new EmailService();
  const reportService = new ReportService();

  const queue = new TaskQueue();
  queue.addTask(new SendEmailCommand(emailService, "alice@example.com", "Welcome!"));
  queue.addTask(new GenerateReportCommand(reportService, "Sales"));

  await queue.run();
})();
