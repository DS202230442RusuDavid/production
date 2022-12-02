import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export default class UpdateDeviceDto {
    @IsNumber()
    @IsNotEmpty()
    public id: number;

    @IsString()
    @IsOptional()
    public description: string;

    @IsString()
    @IsOptional()
    public address: string;

    @IsNumber()
    @IsOptional()
    public maximumHourlyConsumption: number;

    @IsOptional()
    public userId : number | null;

}
