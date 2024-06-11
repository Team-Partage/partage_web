import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';

type Props = {
  content: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleModal: () => void;
};

const FormModal = ({ content, open, setOpen, handleModal }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
