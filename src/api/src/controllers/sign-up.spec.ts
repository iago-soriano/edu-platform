import { SignUpController } from "./sign-up";
import { SignInUpInputBuilder } from "@common/test";
import { MockExpress } from "@presentation/test";

const sutDataBuilder = new SignInUpInputBuilder();

describe("SignUp Controller Adapter", () => {

  const sut = new SignUpController(
    { execute: jest.fn() },
  );

  beforeEach(() => {
    sutDataBuilder.reset();
  });

  it("Should throw an error if e-mail is not provided", async () => {
    const input = sutDataBuilder.withoutEmail().getResult();
    const { req, resp } = MockExpress.getRequest({
      body: input
    });
    expect(sut.execute(req, resp)).rejects.toThrow();
    try {
      await sut.execute(req, resp);
    } catch (e) {
      expect(e).toMatchObject({ errorName: "parameter_not_provided" });
    }
  });

  it("Should throw an error if password is not provided", async () => {
    const input = sutDataBuilder.withoutPassword().getResult();
    const { req, resp } = MockExpress.getRequest({
      body: input
    });
    expect(sut.execute(req, resp)).rejects.toThrow();
    try {
      await sut.execute(req, resp);
    } catch (e) {
      expect(e).toMatchObject({ errorName: "parameter_not_provided" });
    }
  });

  it("Should throw an error if confirmPassword is not provided", async () => {
    const input = sutDataBuilder.withoutConfirmPassword().getResult();
    const { req, resp } = MockExpress.getRequest({
      body: input
    });
    expect(sut.execute(req, resp)).rejects.toThrow();
    try {
      await sut.execute(req, resp);
    } catch (e) {
      expect(e).toMatchObject({ errorName: "parameter_not_provided" });
    }
  });

  it("Should not throw an error if role is not provided", () => {
    const input = sutDataBuilder.withoutRole().getResult();
    const { req, resp } = MockExpress.getRequest({
      body: input
    });
    expect(sut.execute(req, resp)).resolves.toMatchObject({});
  });
});
