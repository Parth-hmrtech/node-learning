const buffer = Buffer.from('Hello, world!', 'utf8');
console.log(buffer);
const buffer2 = Buffer.alloc(10);  // Creates a buffer of 10 bytes
console.log(buffer2);
const buffer3 = Buffer.from([72, 101, 108, 108, 111]); // ASCII codes for "Hello"
console.log(buffer3.toString());
console.log(buffer[0]);  // Access the first byte (72, ASCII for 'H')
const buffer4 = buffer.write('Hi');
console.log(buffer4.toString());  // Output: Hi
console.log(buffer3.length);  // Prints the length of the buffer
