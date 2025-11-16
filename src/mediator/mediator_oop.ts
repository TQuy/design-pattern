class ChatRoom {
  showMessage(user: User, message: string) {
    console.log(`[${user.name}]: ${message}`);
  }
}

class User {
  constructor(public name: string, private chatRoom: ChatRoom) {
    this.name = name;
    this.chatRoom = chatRoom;
  }

  send(message: string) {
    this.chatRoom.showMessage(this, message);
  }
}

const chatRoom = new ChatRoom();
const alice = new User("Alice", chatRoom);
const bob = new User("Bob", chatRoom);

alice.send("Hi Bob!");
bob.send("Hello Alice!");
