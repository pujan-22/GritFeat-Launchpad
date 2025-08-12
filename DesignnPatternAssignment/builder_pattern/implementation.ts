export class User {
  constructor(
    public name: string,
    public email: string,
    public age?: number,
    public address?: string
  ) {}
}

export class UserBuilder {
  private name: string;
  private email: string;
  private age?: number;
  private address?: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  setAge(age: number): UserBuilder {
    this.age = age;
    return this;
  }

  setAddress(address: string): UserBuilder {
    this.address = address;
    return this;
  }

  build(): User {
    return new User(this.name, this.email, this.age, this.address);
  }
}