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

  const handleClick = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onChange && onChange(newTags.join(' '));
  };

  return (
    <div className="flex min-h-14 w-full flex-wrap items-center rounded-lg border border-solid border-transparent bg-neutral-400 px-6 text-neutral-100 transition-colors base-regular focus-within:border-main-skyblue desktop:min-h-[70px]">
      <ol className="flex flex-wrap gap-1">
        {tags.map((tag, index) => {
          if (tag.trim() === '') return <></>;

          const tagId = tag + index;
          return (
            <li
              key={tagId}
              className="cursor-pointer rounded px-1.5 py-[.3125rem] transition-colors hover:bg-neutral-500"
              style={{ color: color }}
              onClick={() => handleClick(index)}
            >
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
