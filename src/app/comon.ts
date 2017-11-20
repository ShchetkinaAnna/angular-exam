export type TSexValues = 0|1|-1;

export type TUserCard = {
    UserID: number;
    BirthDate: number;
    F: string;
    I: string;
    O: string;
    Sex: TSexValues;
    Email: string;
    Checked?: boolean;  
  };
    
  export type TFolder = {
    Name: string,
    Id: string
  };
  
  export type TShortUserList = {
    Value: string,
    Id: number
  };
  
  export type TMailListItem = {
    Id: string,
    Subject: string,
    InDate: string,
    Text: string,
    User: TUserCard,
    Checked?: boolean
  };
  
  export type TMenu = {
    Name: string;
    Id: number;
    Link: string;
  };
    
  export type AuthObject = {
    Token: string,
    Error: string
  };