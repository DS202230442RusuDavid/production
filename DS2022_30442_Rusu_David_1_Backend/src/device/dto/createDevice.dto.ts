import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export default class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsString()
  @IsNotEmpty()
  public address: string;
  
  @IsNumber()
  @IsNotEmpty()
  public maximumHourlyConsumption: number;
}
