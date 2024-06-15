interface Props {
  params: {
    id: string;
  };
}

const page = ({ params }: Props) => {
  return <div>{params.id}</div>;
};

export default page;
