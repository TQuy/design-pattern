// src/singleton.ts

class Settings {
  // The single, private instance
  private static instance: Settings;

  public theme: string = 'dark';

  // The constructor is private to prevent direct instantiation
  private constructor() {
    console.log('Instance of Settings created.');
  }

  // The static method that controls the access to the singleton instance
  public static getInstance(): Settings {
    if (!Settings.instance) {
      Settings.instance = new Settings();
    }
    return Settings.instance;
  }

  public getTheme(): string {
    return this.theme;
  }
}

// Client code
const settings1 = Settings.getInstance();
const settings2 = Settings.getInstance();

if (settings1 === settings2) {
  console.log('Both variables point to the same instance.');
  console.log(`Current theme: ${settings1.getTheme()}`);
} else {
  console.log('Singleton failed, variables contain different instances.');
}