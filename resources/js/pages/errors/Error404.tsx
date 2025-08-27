import ErrorPage from "./ErrorPage";

export default function Error404() {
  return (
    <ErrorPage
      statusCode={404}
      title="PAGE NOT FOUND"
      message="The page you’re looking for doesn’t exist."
    />
  );
}
