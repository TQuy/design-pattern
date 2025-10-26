interface Task {
  execute(): Promise<void>;
}

class SendEmailTask implements Task {
  constructor(private recipient: string, private message: string) {}

  async execute() {
    console.log(`📧 Sending email to ${this.recipient}: ${this.message}`);
  }
}

class GenerateReportTask implements Task {
  async execute() {
    console.log(`📊 Generating sales report...`);
  }
}

class TaskGroup implements Task {
  private tasks: Task[] = [];

  add(task: Task) {
    this.tasks.push(task);
  }

  async execute() {
    console.log(`▶️ Executing task group with ${this.tasks.length} tasks`);
    for (const task of this.tasks) {
      await task.execute();
    }
  }
}

const email1 = new SendEmailTask("user1@example.com", "Welcome!");
const email2 = new SendEmailTask("user2@example.com", "Promo Offer!");
const report = new GenerateReportTask();

const campaign = new TaskGroup();
campaign.add(email1);
campaign.add(email2);
campaign.add(report);
const emailSubGroup = new TaskGroup();
emailSubGroup.add(new SendEmailTask("user3@example.com", "Newsletter"));
campaign.add(emailSubGroup);

campaign.execute();
