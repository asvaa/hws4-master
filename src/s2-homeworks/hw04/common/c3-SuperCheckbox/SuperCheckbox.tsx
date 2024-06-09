import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import s from './SuperCheckbox.module.css';

// Тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

// Тип пропсов для нашего компонента SuperCheckbox
type SuperCheckboxPropsType = Omit<DefaultInputPropsType, 'type'> & {
    onChangeChecked?: (checked: boolean) => void;
    spanClassName?: string;
};

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = ({
    onChange,
    onChangeChecked,
    className,
    spanClassName,
    children, // сюда попадёт текст, типизировать не нужно, т.к. это уже сделано в React.FC
    id,
    ...restProps // все остальные пропсы попадут в объект restProps
}) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.currentTarget.checked; // Получаем состояние чекбокса
        onChange?.(e); // Вызываем onChange, если он был передан
        onChangeChecked?.(checked); // Вызываем onChangeChecked, если он был передан, передавая новое состояние
    };

    const finalInputClassName = `${s.checkbox} ${className ? className : ''}`.trim(); // Смешиваем классы

    return (
        <label className={s.label}>
            <input
                id={id}
                type='checkbox'
                onChange={onChangeCallback}
                className={finalInputClassName}
                {...restProps} // Передаем все остальные пропсы, включая checked
            />
            {children && (
                <span
                    id={id ? `${id}-span` : undefined}
                    className={`${s.span} ${spanClassName ? spanClassName : ''}`.trim()}
                >
                    {children}
                </span>
            )}
        </label>
    );
};

export default SuperCheckbox;
