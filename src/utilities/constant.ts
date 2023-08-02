import { Schema } from 'mongoose';

export const htmlContentHandler = (_id?: Schema.Types.ObjectId) => {
  const htmlVerifyContent = `
  <div style="text-align: center; width: 15rem;">
    <h3 style="text-transform: capitalize;">Confirm your email address</h3>
    <p>Your email address have signed up in my app.<br/> Let tap 
        <a href="http://localhost:6969/verify-account/${_id}">here</a> 
        to confirm it
    </p>
    <p>Cheer, Peace</p>
  </div>
    `;
  return htmlVerifyContent;
};
