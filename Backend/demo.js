// Hash Password
const bcrypt = require("bcryptjs");

async function genHashPwd(Pwd) {
  const salt = await bcrypt.genSalt(10);
  console.log("Salt:", salt);
  const hashedPassword = await bcrypt.hash(Pwd, salt);
  console.log("Original Password:", Pwd);
  console.log("Hashed Password:", hashedPassword);
}

const Pwd = "Asklm@123456";

genHashPwd(Pwd);