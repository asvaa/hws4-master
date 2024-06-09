import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    KeyboardEvent,
    ReactNode,
} from 'react';
import s from './SuperInputText.module.css';

// Тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

// Здесь мы говорим, что у нашего инпута будут такие же пропсы, как у обычного инпута, кроме type
type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
    // Добавляем дополнительные пропсы, которые не входят в стандартный инпут
    onChangeText?: (value: string) => void;
    onEnter?: () => void;
    error?: ReactNode;
    spanClassName?: string;
};

const SuperInputText: React.FC<SuperInputTextPropsType> = ({
    onChange,
    onChangeText,
    onKeyPress,
    onEnter,
    error,
    className,
    spanClassName,
    id,
    ...restProps // Все остальные пропсы попадут в объект restProps
}) => {
    // Callback для изменения значения в инпуте
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e); // Если есть пропс onChange, то передать ему e (поскольку onChange не обязателен)
        onChangeText?.(e.currentTarget.value); // Если есть пропс onChangeText, передать ему текущее значение
    };

    // Callback для обработки нажатия клавиш
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress?.(e); // Если есть пропс onKeyPress, передать ему e
        if (onEnter && e.key === 'Enter') { // Если есть пропс onEnter и нажата клавиша Enter
            onEnter(); // Вызвать onEnter
        }
    };

    // Итоговый класс для ошибки
    const finalSpanClassName = `${s.error} ${spanClassName ? ' ' + spanClassName : ''}`;

    // Итоговый класс для инпута
    const finalInputClassName = `${s.input} ${error ? s.errorInput : s.superInput} ${className ? ' ' + className : ''}`; // Задача на смешивание классов

    return (
        <div className={s.inputWrapper}>
            <input
                id={id}
                type={'text'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}
                {...restProps} // Отдаём инпуту остальные пропсы, если они есть (например, value)
            />
            {error && ( // Показываем span только если есть ошибка
                <span
                    id={id ? `${id}-span` : undefined}
                    className={finalSpanClassName}
                >
                    {error}
                </span>
            )}
        </div>
    );
};

export default SuperInputText;
