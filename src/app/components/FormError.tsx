type Props = {
  message: string;
};

export default function FormError({ message }: Props) {
  return <p className="ml-2 mb-2 text-red-400">{message}</p>;
}
