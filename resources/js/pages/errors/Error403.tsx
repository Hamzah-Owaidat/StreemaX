import ErrorPage from "./ErrorPage";

export default function Error403() {
  return (
    <ErrorPage
      statusCode={403}
      title="ACCESS DENIED"
      message="🚫 This dashboard is restricted to administrators only."
    />
  );
}
