import { Spinner } from "./ui/spinner";

const Loader = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-2">
      <Spinner />
      <span>{label}</span>
    </div>
  );
};
export default Loader;
