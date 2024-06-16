import EditMyInfo from './_components/EditMyInfo';
import PasswordCheck from './_components/PasswordCheck';
import WithDraw from './_components/WithDraw';

const Mypage = () => {
  return (
    <div className="flex w-[640px] flex-col gap-[100px]">
      <EditMyInfo />
      <PasswordCheck />
      <WithDraw />
    </div>
  );
};

export default Mypage;
