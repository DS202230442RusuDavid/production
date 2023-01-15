import { GrpcOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

  const PROTO_PATH = join(process.cwd(), 'src/protos/app.proto');
  
export const gRPCOptions : GrpcOptions  = {
    transport: Transport.GRPC,
    options: {
      package: "chat",
      protoPath: PROTO_PATH,
      // url: '0.0.0.0:9090',
      url: 'http://grpcproxy.duckdns.org:9090'
},
  }