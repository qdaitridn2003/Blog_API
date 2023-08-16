export const htmlVerifyContentHandler = (otp?: string) => {
  const htmlVerifyContent = `
  <div style="text-align: center; width: 15rem;">
    <h3 style="text-transform: capitalize;">Confirm your email address</h3>
    <p>Verify your email gives you access to more blog app.
    Just copy the code behind to confirm your request. Do not share this code and it is expire in few minutes</p>
    <p style="background-color: #125ecb;
    padding: 8px 12px; margin: 8px 0px ;color: #fff;
    font-weight: bold; font-size: 14px;
    border-radius: 16px">${otp}</p>
    <p>Cheer, Peace</p>
  </div>
    `;
  return htmlVerifyContent;
};

export const htmlOtpContentHandler = (otp?: string) => {
  const htmlOtpContent = `
  <div style="text-align: center; width: 15rem;">
    <h3 style="text-transform: capitalize;">Reset Password</h3>
    <p>Someone request that the password be reset for the following account
    . Just copy the code behind to confirm your request. Do not share this code and it is expire in few minutes</p>
    <p style="background-color: #125ecb;
    padding: 8px 12px; margin: 8px 0px ;color: #fff;
    font-weight: bold; font-size: 14px;
    border-radius: 16px">${otp}</p>
    <p>Cheer, Peace</p>
  </div>
  `;
  return htmlOtpContent;
};

export const defaultAvatarUrl = 'https://alumni.engineering.utoronto.ca/files/2022/05/Avatar-Placeholder-400x400-1.jpg';

export const defaultThumbnailUrl = 'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png';
