import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";

export interface IVerificationService {
    sendMail(to: string, code: string): Promise<SMTPTransport.SentMessageInfo>
    sendSms(phone: string, code: string): Promise<void>
}