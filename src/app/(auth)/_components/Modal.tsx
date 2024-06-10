import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';

type Props = {
  title: '로그인' | '회원가입';
  content: string;
  handleModal: () => void;
};

const FormModal = ({ title, content, handleModal }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full">
          <Button type="submit" variant="active" size="lg" className="mt-[56px] w-full">
            {title}
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="h-[237px] w-[400px] rounded-[8px] border-0 mobile:h-[198px] mobile:w-[335px] ">
        <DialogHeader className="pt-[80px] text-neutral-100 medium-regular mobile:pt-[64px] mobile:base-regular">
          {content}
        </DialogHeader>
        <div className="flex justify-center">
          <Button
            type="button"
            variant="active"
            font="base"
            className="mx-[20px] h-[48px] w-[100px] mobile:h-[42px] mobile:w-full "
            onClick={handleModal}
          >
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
