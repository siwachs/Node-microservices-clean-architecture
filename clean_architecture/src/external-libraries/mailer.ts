import { injectable } from "inversify";
import { IMailer } from "../interfaces/IMailer";

@injectable()
export class Mailer implements IMailer {
  SendEmail(to: string, product: unknown) {
    console.log("sending email...");
    return true;
  }
}
