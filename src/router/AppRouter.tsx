import { useRoutes } from "raviger";
import About from "../components/About";
import App from "../App";
import AppContainer from "../AppContainer";
import Form from "../components/Form";
import Home from "../components/Home";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/forms/:id": ({ id }: { id: string }) => <Form formId={Number(id)} />,
};

export default function AppRouter() {
  let routeResults = useRoutes(routes);

  return <AppContainer>{routeResults}</AppContainer>;
}
