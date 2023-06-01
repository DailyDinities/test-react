import { HomePage } from "./HomePage.js";
import GridAction from "./actions/GridAction.js";

export default {
  home: {
    path: "/",
    method: "get",
    handler: HomePage,
    action: (context, route, done) => context.executeAction(GridAction.load)
  },
};