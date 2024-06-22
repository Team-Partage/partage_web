import { useState } from 'react';

interface Props {
  id?: string;
  placeholder?: string;
  color?: string;
  onEnter?: (value: string) => void;
}

const TagInput = ({ onEnter, color, ...rest }: Props) => {
  const [value, setValue] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter && onEnter(value);

      if (value.length !== 0) {
        console.log('first');
        setTags([...tags, value]);
        setValue('');
      }
    }
  };

  return (
    <div className="flex w-full flex-wrap items-center rounded-lg border border-solid border-transparent bg-neutral-400 px-6 text-neutral-100 transition-colors base-regular focus-within:border-main-skyblue  mobile:min-h-14 tablet:min-h-14">
      <ol className="flex flex-wrap gap-1">
        {tags.map((tag, index) => {
          return (
            <li
              key={tag + index}
              className="transition-colors"
              style={{ color: color }}
            >{`#${tag}`}</li>
          );
        })}
        <input
          className="bg-inherit text-neutral-100 placeholder:text-neutral-200"
          type="text"
          value={value}
          onKeyDown={handleEnter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
          }}
          autoComplete="off"
          {...rest}
        />
      </ol>
    </div>
  );
};

export default TagInput;
