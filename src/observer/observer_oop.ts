interface Observer {
  update: (data: any) => void;
}

class Subject {
  private observers: Observer[] = [];

  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data: any) {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}

class EmailService implements Observer {
  update(data: any) {
    console.log(`📧 Email sent to user: ${data}`);
  }
}

class LogService implements Observer {
  update(data: any) {
    console.log(`🧾 Log saved: ${data}`);
  }
}

// Demo
const subject = new Subject();
const email = new EmailService();
const log = new LogService();

subject.subscribe(email);
subject.subscribe(log);

subject.notify("New order placed!");
