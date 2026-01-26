import { Transporter } from "nodemailer";
import { IVerificationService } from "../interfaces/notification.service.interface.js";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
import axios from 'axios'
import { logger } from "../adapter/logger/logger.js";

export class VerificationService implements IVerificationService {
    constructor(private readonly transporter: Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>) {  }

    async sendMail(to: string, code: string): Promise<SMTPTransport.SentMessageInfo> {
        return await this.transporter.sendMail({
            from: process.env.EMAIL,
            to,
            text: code
        })
    }

    async sendSms(phone: string, code: string): Promise<void>{

        if(!process.env.PHONE_NUMBER){
            logger.error("Phone number is required")
        }

        await axios.post("https://api.exolve.ru/messaging/v1/SendSMS", {
            number: String(process.env.PHONE_NUMBER),
            destination: phone,
            text: code
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.EXOLVE_API}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => console.log(res.data))
            .catch((error: Error) => {
                console.log(error)
                logger.error(`Error sending sms code: ${error.message}`);
        })
    }
}