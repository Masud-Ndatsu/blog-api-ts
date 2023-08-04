import { ITokenData } from "./authentication.interface";
import AuthenticationService from "./authentication.service";

describe("The AuthenticationService", () => {
  const authService = new AuthenticationService();
  describe("when creating a cookie", () => {
    const tokenData: ITokenData = {
      token: "",
      expiresIn: 1,
    };
    it("should return a string", () => {
      const cookie = authService.createCookie(tokenData);
      expect(typeof cookie).toEqual("string");
    });
  });
});
