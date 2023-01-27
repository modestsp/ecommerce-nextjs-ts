import jwt from 'jsonwebtoken';

const privateKey = Buffer.from(process.env.PRIVATE_KEY!, 'base64').toString(
  'ascii'
);
const publicKey = Buffer.from(process.env.PUBLIC_KEY!, 'base64').toString(
  'ascii'
);
// Sign the jwt with a private key
export const signJwt = (
  object: Object,
  options?: jwt.SignOptions | undefined
) => {
  return jwt.sign(object, privateKey, {
    // Options can be undefined
    ...(options && options),
    algorithm: 'RS256',
  });
};

// Verify the jwt with a public key
export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
};
