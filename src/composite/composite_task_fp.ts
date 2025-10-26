const sendEmailTask = async (
  recipient: string,
  message: string
): Promise<void> => {
  console.log(`📧 Sending email to ${recipient}: ${message}`);
};

const GenerateReportTask = async (): Promise<void> => {
  console.log(`📊 Generating sales report...`);
};

const createTaskGroup = (
  ...tasks: (() => Promise<void>)[]
): (() => Promise<void>) => {
  return async () => {
    console.log(`▶️ Executing task group with ${tasks.length} tasks`);
    for (const task of tasks) {
      await task();
    }
  };
};

const caller = createTaskGroup(
  () => sendEmailTask("user1@example.com", "Welcome!"),
  () => sendEmailTask("user2@example.com", "Promo Offer!"),
  () => GenerateReportTask(),
  createTaskGroup(() => sendEmailTask("user3@example.com", "Newsletter"))
);
caller();
