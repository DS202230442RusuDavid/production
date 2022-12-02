import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export default class UpdateEnergyDto {
  @IsNumber()
  @IsNotEmpty()
  public id: number;

  @IsNumber()
  @IsOptional()
  public consumption: number;

  @IsDateString()
  @IsOptional()
  public timeStamp: Date;

  @IsNumber()
  @IsOptional()
  public deviceId: number;
}
