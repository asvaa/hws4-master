import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import s from './SuperButton.module.css';

// Тип пропсов обычной кнопки, где children хранит название кнопки
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

// Типы для нашего кастомного компонента SuperButton
type SuperButtonPropsType = DefaultButtonPropsType & {
    xType?: any // Ограничиваем значения xType
};

const SuperButton: React.FC<SuperButtonPropsType> = ({
    xType = 'default', // Устанавливаем значение по умолчанию
    className,
    disabled,
    ...restProps // Все остальные пропсы попадут в объект restProps, там же будет children
}) => {
    // Определяем финальный класс для кнопки в зависимости от состояния и типа
    const finalClassName = `${s.button} ${
        disabled
            ? s.disabled
            : xType === 'red'
            ? s.red
            : xType === 'secondary'
            ? s.secondary
            : s.default
    } ${className ? className : '0'}`.trim();

    return (
        <button
            disabled={disabled}
            className={finalClassName}
            {...restProps} // Передаем кнопке остальные пропсы, если они есть (children там внутри)
        />
    );
};

export default SuperButton;
