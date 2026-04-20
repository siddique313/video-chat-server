"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("./config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: config_1.CORS_ORIGIN,
        credentials: true,
    });
    await app.listen(config_1.PORT, '0.0.0.0');
    console.log(`🚀 Server running on port ${config_1.PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map