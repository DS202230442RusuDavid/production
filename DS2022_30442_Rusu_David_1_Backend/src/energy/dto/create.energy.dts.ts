import { IsDate, IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export default class CreateEnergyDto {
  @IsNumber()
  @IsNotEmpty()
  public consumption: number;

  @IsDateString()
  @IsNotEmpty()
  public timeStamp: Date;

  @IsNumber()
  @IsNotEmpty()
  public deviceId: number;
}
