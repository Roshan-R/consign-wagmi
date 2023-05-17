type Props = {
  title: string;
  image: string;
  description?: string;
};
const NftCertificate = ({ title, image, description }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="border-brutal flex bg-white">
        <div className="ml-2 flex flex-col pt-1 font-roboto">
          <div className="text-2xl">{title}</div>
          <div className="text-xl text-gray-800">{description}</div>
        </div>
      </div>
      <div className="border-brutal flex grow justify-center bg-purple-400">
        <img src={image} className="border-brutal m-2 w-full bg-gray-200"></img>
      </div>
    </div>
  );
};
export default NftCertificate;
