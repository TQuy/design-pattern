export class NotificationBuilder {
  private title: string = ''
  private priority: 'HIGH' | 'MEDIUM' | 'LOW' = 'MEDIUM'
  private attachments: string[] = []
  private tags: string[] = []

  constructor(
    private recipient: string,
    private message: string,
  ) {}

  withTitle(title: string): NotificationBuilder {
    this.title = title;
    return this;
  }

  withPriority(priority: 'HIGH' | 'MEDIUM' | 'LOW'): NotificationBuilder {
    this.priority = priority;
    return this;
  }

  addAttachment(attachment: string): NotificationBuilder {
    this.attachments.push(attachment);
    return this;
  }

  addTag(tag: string): NotificationBuilder {
    this.tags.push(tag);
    return this;
  }

  build() {
    return Object.freeze({
      recipient: this.recipient,
      message: this.message,
      title: this.title,
      priority: this.priority,
      attachments: [...this.attachments],
      tags: [...this.tags]
    });
  }
}