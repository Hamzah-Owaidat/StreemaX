import ErrorPage from "./ErrorPage";

export default function Error500() {
  return (
    <ErrorPage
      statusCode={500}
      title="SERVER ERROR"
      message="Something went wrong on our side. Please try again later."
    />
  );
}
