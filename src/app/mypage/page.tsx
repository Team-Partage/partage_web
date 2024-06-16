import EditMyInfo from './_components/EditMyInfo';
import PasswordCheck from './_components/PasswordCheck';
import WithDraw from './_components/WithDraw';

const Mypage = () => {
  return (
    <div className="mt-[40px] flex w-full flex-col items-center justify-center ">
      <div className="flex w-[640px] flex-col gap-[100px]">
        <EditMyInfo />
        <PasswordCheck />
        <WithDraw />
      </div>
    </div>
  );
};

export default Mypage;
