type Command = {
  execute: () => Promise<void>;
};

// The “receivers” — real service logic
const EmailService = {
  send: async (to: string, subject: string) => {
    console.log(`📧 Sending email to ${to}: ${subject}`);
  },
};

const ReportService = {
  generate: async (type: string) => {
    console.log(`📊 Generating ${type} report`);
  },
};

// Factory functions for commands
const createSendEmailCommand = (to: string, subject: string): Command => {
  return {
    execute: async () => {
      await EmailService.send(to, subject);
    },
  };
};

const createGenerateReportCommand = (type: string): Command => {
  return {
    execute: async () => {
      await ReportService.generate(type);
    },
  };
};

// Invoker — our simple queue
const createTaskQueue = () => {
  const queue: Command[] = [];

  return {
    addTask: (cmd: Command) => {
      queue.push(cmd);
    },
    run: async () => {
      for (const cmd of queue) {
        await cmd.execute();
      }
    },
  };
};

// 🧪 Usage
(async () => {
  const queue = createTaskQueue();

  queue.addTask(createSendEmailCommand("alice@example.com", "Welcome!"));
  queue.addTask(createGenerateReportCommand("Sales"));

  await queue.run();
})();
