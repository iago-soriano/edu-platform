import { SignInController } from "./sign-in";
import { MockExpress } from "@edu-platform/common/test";

describe.skip("SignIn Controller Adapter", () => {
  const sut = new SignInController(
    { execute: jest.fn() },
  );

  it("Should not throw an error if e-mail is not provided", async () => {

    const { req, resp } = MockExpress.getRequest({
      body: { password: "" }
    });

    expect(sut.execute(req, resp)).resolves.toMatchObject({
      statusCode: 201,
    });
  });

  it("Should not throw an error if password is not provided", async () => {

    const { req, resp } = MockExpress.getRequest({
      body: { email: "" }
    });

    expect(sut.execute(req, resp)).resolves.toMatchObject({
      statusCode: 201,
    });
  });
});
