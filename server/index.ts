import app from "./app.ts";
import { PORT } from "./config/env.ts";

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
