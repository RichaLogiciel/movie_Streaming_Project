import crypto from 'crypto';
const generateSecret = (): string => crypto.randomBytes(64).toString('hex');

const defaultSecret = generateSecret();
export default defaultSecret;