const crypto = require('crypto');
const randomNum = Math.floor(Math.random() * 10) + 1;
const hash = crypto.createHash('sha256').update(randomNum.toString()).digest('hex');
console.log(hash);

const hmac = crypto.createHmac('sha256','secret-key').update('parht').digest('hex');
console.log(hmac);

function encryptPassword(password, secretKey) {
  const iv = crypto.randomBytes(12); // Initialization vector
  const cipher = crypto.createCipheriv('aes-256-gcm', secretKey, iv);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag();
  return { iv: iv.toString('hex'), encrypted, tag: tag.toString('hex') };
}

function decryptPassword(encryptedData, secretKey) {
  const { iv, encrypted, tag } = encryptedData;
  const decipher = crypto.createDecipheriv('aes-256-gcm', secretKey, Buffer.from(iv, 'hex'));
  decipher.setAuthTag(Buffer.from(tag, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const secretKey = crypto.randomBytes(32); // 256-bit key


const password = 'Parth@1234#1234';
const encryptedData = encryptPassword(password, secretKey);
console.log('Encrypted:', encryptedData);

const decryptedPassword = decryptPassword(encryptedData, secretKey);
console.log('Decrypted:', decryptedPassword);
