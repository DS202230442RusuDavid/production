import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { EnergyService } from 'src/energy/energy.service';
import Energy from 'src/db/entities/energy.entity';
import EnergyEvent from './energyEvent.dto';

const QUEUE_NAME = process.env.QUEUE_NAME!;
const EXCHANGE_NAME = process.env.EXCHANGE_NAME!;

@Injectable()
export class MessagingService {
  constructor(private readonly energyService: EnergyService) {}
  
  @RabbitSubscribe({
    exchange: EXCHANGE_NAME,
    routingKey: 'subscribe-route',
    queue: QUEUE_NAME,
  })

  public async pubSubHandler(msg: EnergyEvent) { 
    console.log(msg); 
    //convert timestamp to date
    const date = new Date(msg.timestamp);
    this.energyService.handleEnergyEvent({device:{id: msg.device_id} , consumption: msg.measurement_value, timeStamp: date} as Energy);
  }
}