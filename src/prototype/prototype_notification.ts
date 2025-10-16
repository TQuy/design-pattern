export interface Notification {
  recipient: string;
  title: string;
  message: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  metadata?: Record<string, any>;

  clone(): Notification;
}

export class BaseNotification implements Notification {
  constructor(
    public recipient: string,
    public title: string,
    public message: string,
    public priority: 'HIGH' | 'MEDIUM' | 'LOW' = 'MEDIUM',
    public metadata: Record<string, any> = {}
  ) { }

  clone(): BaseNotification {
    return structuredClone(this);
  }
}

