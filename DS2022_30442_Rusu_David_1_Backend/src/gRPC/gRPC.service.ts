
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, Subject } from 'rxjs';
import { User, ChatMessage, Empty, ChatService, JoinRequest } from 'src/protos/app.proto.interface';
import Role from 'src/roles/role.enum';

@Controller('chat')
export class gRPCService implements ChatService {

  usersQueue:[{
    id: string,
    subject: Subject<ChatMessage>
  }] = [] as unknown as [{id: string, subject: Subject<ChatMessage>}];

  adminsQueue:[{
    id: string,
    subject: Subject<ChatMessage>
  }] = [] as unknown as [{id: string, subject: Subject<ChatMessage>}];

  private rooms: Map<string,[Subject<ChatMessage>,Subject<ChatMessage>]> = new Map();

  private subjectForEndpoint: Map<string, Subject<ChatMessage>> = new Map();
  private observableForEndpoint: Map<string, Observable<ChatMessage>> = new Map();
  private peopleInService : [string] = [''];

  chatEnd(user: User): Empty {
    // Complete the subjects of the room
    const roomSubjects = this.rooms.get(user.room.toString());
    if (roomSubjects) {
      //TODO DELETE PEOPLE IN SERVICE
      roomSubjects[0].complete();
      roomSubjects[1].complete();
    }

    // Remove the room
    this.rooms.delete(user.room.toString());
    //TIP: in front end for admin add option to join another room after chat ends
     return {} as Empty;
  }

  @GrpcMethod("ChatService","sendMessage")
  sendMessage(chatMessage: ChatMessage): Empty {
    //We get the subject for the endpoint and we send the message to the client
    
    console.log(chatMessage)
    //Get the room
    const roomSubjects = this.rooms.get(chatMessage.user.room.toString());

    if(!roomSubjects){
      console.log("Room not found")
      return {} as Empty;
    }
    
    
    roomSubjects.forEach(subject => {
      console.log(subject);
      subject.next(chatMessage);
    });

    return {} as Empty;
  }

  @GrpcMethod("ChatService","subscribeToMessages")
  subscribeToMessages(joinRequest: JoinRequest): Observable<ChatMessage> {
    console.log("Subscribing to messages")
    let subject: Subject<ChatMessage>;
    let observable: Observable<ChatMessage>;

    if(this.observableForEndpoint.has(joinRequest.id)){ 
      //The client is already subscribed to this endpoint
      console.log("Client already subscribed")
      observable = this.observableForEndpoint.get(joinRequest.id)
    }else{
      //The client is not subscribed to this endpoint, so we create a new subject and observable
      console.log("Creating subscription for new client")
      subject = new Subject<ChatMessage>();
      observable = new Observable<ChatMessage>();
      new Observable<ChatMessage>();
      this.subjectForEndpoint.set(joinRequest.id, subject);
      this.observableForEndpoint.set(joinRequest.id, observable);
    }

    ///DEBUG
    console.log(joinRequest);
    //Add to queue if admin or user doesnt exist in queue
    if(joinRequest.role === Role.Admin){
      if(this.peopleInService.find(admin => admin === joinRequest.id) === undefined){
        this.adminsQueue.push({
          id: joinRequest.id,
          subject: subject
        });
      }
    }else{
      if(this.peopleInService.find(admin => admin === joinRequest.id) === undefined){
        this.usersQueue.push({
          id: joinRequest.id,
          subject: subject
        });
      }
    }

    this.peopleInService.push(joinRequest.id);
    //call the updateRooms function after 1 second
    setTimeout(()=>{
      this.updateRooms();
    },1000);
    return observable;
  }

  updateRooms = () => {
    //This function pairs users with admins and creates a room for them
    console.log("Admins queue length: " + this.adminsQueue.length)
    console.log("Users queue length: " + this.usersQueue.length)
    if(this.adminsQueue.length > 0 && this.usersQueue.length > 0){
      const admin = this.adminsQueue.shift();
      const user = this.usersQueue.shift();
      // const room = Math.floor(Math.random() * 100000);
      const room = -1;
      this.rooms.set(room.toString(), [admin.subject, user.subject]);

      if(admin.subject == undefined || user.subject == undefined){
        console.log("Undefined subject");
        return;
      };
      
      admin.subject.next({
        user: {
          id: admin.id,
          role: "admin",
          room: room
        },
        msg: "You are now connected to a user",
        time: new Date().toISOString()
      });

      user.subject.next({
        user: {
          id: user.id,
          role: "user",
          room: room
        },
        msg: "You are now connected to an admin",
        time: new Date().toISOString()
      });
      console.log("Room created: " + room);
    }
  }
}