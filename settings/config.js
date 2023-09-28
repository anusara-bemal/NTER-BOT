require("dotenv").config();

module.exports = {
    TOKEN: process.env.TOKEN || "",  // your bot token
    PREFIX: process.env.PREFIX || "*", //<= default is #  // bot prefixx
    OWNER_ID: process.env.OWNER_ID || "", //your client id
}
