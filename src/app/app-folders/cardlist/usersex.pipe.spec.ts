import { UsersexPipe } from './usersex.pipe';

describe('UsersexPipe', () => {
  let pipe; 

  beforeEach(() => {
    pipe = new UsersexPipe();
  });

  it('create an instance', () => {    
    expect(pipe).toBeTruthy();
  });

  it('should transform null', () => {
    expect(pipe.transform(null)).toBe("");
  });

  it('should transform -1', () => {
    expect(pipe.transform(-1)).toBe("");
  });  

  it('should transform 0', () => {
    expect(pipe.transform(0)).toBe("Мужчина");
  });    

  it('should transform 1', () => {
    expect(pipe.transform(1)).toBe("Женщина");
  });      

  it('should throw an error', () => {
    expect(() => {
      pipe.transform(<any>10)
    }).toThrowError();    
  });
});
