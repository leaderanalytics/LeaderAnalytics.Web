export class ContactRequest {
  public Name: string;
  public EMail: string;
  public Phone: string;
  public Requirement: string;
  public Message: string;
  public Captcha: string;
}

export class AsyncResult {
  public Success: boolean;
  public ErrorMessage: string;
  public ResultCount: number;
  public Data: any;
}
