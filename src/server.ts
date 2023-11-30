import app from "./app";

import mongoose from "mongoose";
import config from "./app/config";

async function main() {
  try {
    await mongoose.connect(config.dataBaseUrl as string);
    app.listen(config.port, () => {
      console.log(`Mongoose Project Port On ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
