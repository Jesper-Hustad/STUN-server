export class Attribute{
  type : number
  length : number
  value : Buffer


  constructor(type: number, length: number, value: Buffer) {
    this.type = type;
    this.length = length;
    this.value = value;
  }

  

}
