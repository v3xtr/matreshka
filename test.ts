import { VerificationService } from "./internal/service/verification.service.js";
import { transporter } from "./internal/adapter/nodemailer/nodemailer.js";
import "dotenv/config"

(async () => {
    try {
        await new VerificationService(transporter).sendSms("79892911760", "122343");
        console.log('✅ Тест завершен успешно');
    } catch (error) {
        console.error('❌ Ошибка теста:', error);
        process.exit(1);
    }
})();