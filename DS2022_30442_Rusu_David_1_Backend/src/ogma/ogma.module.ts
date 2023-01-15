import { Module } from "@nestjs/common";
import { OgmaModule } from "@ogma/nestjs-module";

@Module({
    imports: [OgmaModule.forRoot({
        service: {
            color: true,
            json: false,
            application: 'NestJS'
        },
    }),
    ],
    exports: [],
    controllers: [],
})
export class Ogma { }