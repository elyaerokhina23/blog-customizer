import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  setArticleState,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formState, setFormState] = useState(defaultArticleState);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect((): (() => void) | undefined => {
    if (!isSidebarOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent): void => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSidebarOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setArticleState(formState);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    setArticleState(defaultArticleState);
  };

  return (
    <div ref={rootRef}>
      <ArrowButton
        isOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isSidebarOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <Select
            title="Шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(option) =>
              setFormState({
                ...formState,
                fontFamilyOption: option,
              })
            }
          />

          <RadioGroup
            title="Размер шрифта"
            name="fontSize"
            selected={formState.fontSizeOption}
            options={fontSizeOptions}
            onChange={(option) =>
              setFormState({
                ...formState,
                fontSizeOption: option,
              })
            }
          />

          <Select
            title="Цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={(option) =>
              setFormState({
                ...formState,
                fontColor: option,
              })
            }
          />

          <Separator />

          <Select
            title="Цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={(option) =>
              setFormState({
                ...formState,
                backgroundColor: option,
              })
            }
          />

          <RadioGroup
            title="Ширина контента"
            name="contentWidth"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={(option) =>
              setFormState({
                ...formState,
                contentWidth: option,
              })
            }
          />

          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              htmlType="reset"
              type="clear"
              onClick={handleReset}
            />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
