import { useState } from 'react';

interface Props {
  id?: string;
  placeholder?: string;
  value?: string;
  color?: string;
  onChange?: (tags: string) => void;
}

/**
 * TODO: 태그 삭제 기능
 */
const TagInput = ({ onChange, color, value = '', ...rest }: Props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [tags, setTags] = useState<string[]>(value.split(' '));

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputValue.length !== 0) {
        const newTags = [...tags, inputValue];
        onChange && onChange(newTags.join(' '));
        setTags(newTags);
        setInputValue('');
      }
    }
  };

  return (
    <div className="flex w-full flex-wrap items-center rounded-lg border border-solid border-transparent bg-neutral-400 px-6 text-neutral-100 transition-colors base-regular focus-within:border-main-skyblue  mobile:min-h-14 tablet:min-h-14">
      <ol className="flex flex-wrap gap-1">
        {tags.map((tag, index) => {
          return (
            <li key={tag + index} className="transition-colors" style={{ color: color }}>
              {tag && `#${tag}`}
            </li>
          );
        })}
        <input
          className="bg-inherit text-neutral-100 placeholder:text-neutral-200"
          type="text"
          value={inputValue}
          onKeyDown={handleEnter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
          }}
          autoComplete="off"
          {...rest}
        />
      </ol>
    </div>
  );
};

export default TagInput;
