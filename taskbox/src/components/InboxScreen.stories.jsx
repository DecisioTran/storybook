import { Provider } from "react-redux";
import store from "../lib/store";
import InboxScreen from "./InboxScreen";
import { MockedState } from "./TaskList.stories";
import { rest } from "msw";


export default {
  component: InboxScreen,
  title: "InboxScreen",
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  tags: ["autodocs"],
};

export const Default = {
  parameters: {
    msw: {
       handlers: [
         rest.get(
          'https://jsonplaceholder.typicode.com/todos?userId=1',
          (req, res, ctx) => {
            return res(ctx.json(MockedState.tasks));
          }
        ),
      ],
    },
  },
};

export const Error = {
  parameters: {
    msw: {
      handlers: [
        rest.get(
          "https://jsonplaceholder.typicode.com/todos?userId=1",
          (req, res, ctx) => {
            return res(ctx.status(403));
          }
        ),
      ],
    },
  },
};
