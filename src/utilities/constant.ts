export const htmlContentHandler = (_id?: string) => {
  const htmlVerifyContent = `
    <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap ;border-radius: 8px; padding: 8px 12px; box-shadow: 0 1px 1px 0 #ccc;">
            <h2>Confirm Your Email Address</h2>
            <p style="font-weight: 400; width: 100%; text-align: center;">Your email has signed up in my app. <br/> Let tap to button to verify this email address.</p>
            <div style="margin-top: 16px;">
                <button style="width: 16rem; background: #125ecb; padding: 16px 12px; border-style: none; border-radius: 4px;">
                    <a href="http://localhost:6969/verify-account/${_id}" 
                    style="color: #fff; text-decoration: none; font-size: 16px; text-transform: uppercase; font-weight: 600;">
                    Verify Email</a>
                </button>
            </div>
            <p style="width: 100%; text-align: center; margin-top: 16px;">Cheer,</p>
            <p style="width: 100%; text-align: center; margin-top: -8px;">Peace Out !</p>
        </div>
    `;
  return htmlVerifyContent;
};
