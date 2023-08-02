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

export const defaultAvatarUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAAMFBMVEXh4eGjo6OgoKDk5OS+vr6tra3T09PFxcXe3t7Pz8/b29u7u7vX19eoqKi4uLixsbHKbNcEAAACuklEQVR4nO2ay9brIAiFVbxEE+P7v+0xSZt1+jcXq2A7YE/amV9ABEEhWCwWi8VisVjEAgAxDOvPd9YXXie5Kmkv+lPApKNSakPIf6Ke+kKAGOVj+aeUHHtaAvxfgA3Cd2OA8QBghRh7MZwRLAxdAECfEmQG3cEOlwR9GOwVwCJLTQDmDsEQmwH8pRtWV1CHZrwjkDIOlAAFRqA2A8wlCDMlwlDgB2JP3EbkJsK4BFfgh+wJR+eJX0A4T1AvCIQJsyggaEPiFxCus+SOQJgtf2A7/sC58AunI6QShESapr6fKYs8QVsvlIQlfQF7bwVigPvdQF463h7StCXTU+nqNpU6AFwy9CI4Z+hHIIRWR/0FpfsRCJjMXwilTO9Wj0//d1qUTP1aLDuDCC49juuYXPhCy22hyBiTtVMQ32o8slgsFutYsOs7i4tgvXM6yzlvQ88JVV4qWDfHdR60K6fL2dnQgSN/u9dmWf2oapLSaE+atvPnu3S4+gtHLh6IbJHXf6vWzjBMpkBfX9h0NBI7pZDJIjvEfwTwgPB46x/Uy0UQaDU1hKsb3A1FwtgT4D51wQuDROi+lfV8LyBaR5eDaSTIDKap8TPEZoLM0NR8arfBymCqAQpbzgUM1R0wi0SQGSpbwlB/HrwhVDZkAxbAolBlhLLOf5nq5gNom3FFqNuQeLuxej8imqE6KhFO5wdB/RmNFhNV8bAKcLaDsg0JGyUwGwd2CAzNI8NmBoShZSMDyti0iQFpcAuFM9ojtcTCC0OoO6OUQbzWDTV1tBpRB5bZGR9f6LCcsDPA4STmFCAnJvwLPkxzqSWUnIkmNFB2wV8u9oTPOCat7rosivo5Mgg/xzMKpeLc41E2iMGPa8dLvXy8lGb0Q68R1db30yk+x2Mx6T4dvzeO9VX+9i6fB2QsFovFYrFYxPoH9ScZU9maJOIAAAAASUVORK5CYII=';
