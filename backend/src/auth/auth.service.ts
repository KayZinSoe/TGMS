export class AuthService {
  userRepository: any;
  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    const token = this.generateToken(user);

    console.log("Generated token:", token);

    return {
      userId: user.id,
      token,
    };
  }
    generateToken(user: any) {
        throw new Error("Method not implemented.");
    }
}