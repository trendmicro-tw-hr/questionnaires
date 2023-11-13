import { useRouteError } from "react-router-dom";
import Header from "../Share/Header";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="relative flex flex-col">
      <Header />
      <div className="h-screen justify-center items-center flex gap-3 text-2xl">
        <h1>404</h1>
        <h2 className="border-l-1 pl-3">This page could not be found.</h2>
      </div>
    </div>
  );
}
