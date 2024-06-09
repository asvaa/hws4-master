import React, { useState } from 'react';
import s from './Stand.module.css';
import SuperInputText from './common/c1-SuperInputText/SuperInputText';
import SuperCheckbox from './common/c3-SuperCheckbox/SuperCheckbox';
import SuperButton from './common/c2-SuperButton/SuperButton';

const Stand = () => {
    const [stateForAllInputs, setValue] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [stateForAllCheckboxes, setChecked] = useState<boolean>(false);

    const handleInputChange = (value: string) => {
        setValue(value);
        if (value.trim()) {
            setError('');
        } else {
            setError('Error');
        }
    };

    const handleEnterPress = () => {
        if (!stateForAllInputs.trim()) {
            setError('Error');
        } else {
            setError('');
        }
        setValue('');
    };

    return (
        <div id={'hw4-stand'} className={s.stand}>
            <div className={s.inputs}>
                {/* Совместим со старым кодом: */}
                <div>
                    <SuperInputText
                        id={'hw4-super-input-like-old'}
                        value={stateForAllInputs}
                        onChange={(e) => setValue(e.currentTarget.value)}
                        aria-label="Old style input"
                    />
                </div>
                {/* Инпут с ошибкой: */}
                <div>
                    <SuperInputText
                        id={'hw4-super-input-with-error'}
                        value={stateForAllInputs}
                        onChangeText={handleInputChange}
                        error={error}
                        onEnter={handleEnterPress}
                        aria-describedby={error ? 'hw4-error-message' : undefined}
                    />
                    {error && <div id="hw4-error-message" className={s.error}>{error}</div>}
                </div>
            </div>

            <div className={s.buttons}>
                {/* Обычная кнопка: */}
                <div>
                    <SuperButton id={'hw4-super-button-default'}>
                        default
                    </SuperButton>
                </div>
                {/* Красная кнопка: */}
                <div>
                    <SuperButton id={'hw4-super-button-red'} xType={'red'}>
                        red
                    </SuperButton>
                </div>
                {/* Задизэйбленная кнопка: */}
                <div>
                    <SuperButton
                        id={'hw4-super-button-disabled'}
                        xType={'red'}
                        disabled
                    >
                        disabled
                    </SuperButton>
                </div>
                {/* Кнопка secondary: */}
                <div>
                    <SuperButton
                        id={'hw4-super-button-secondary'}
                        xType={'secondary'}
                    >
                        secondary
                    </SuperButton>
                </div>
            </div>

            <div className={s.checkboxes}>
                {/* Чекбокс с текстом: */}
                <div>
                    <SuperCheckbox
                        id={'hw4-super-checkbox-with-text'}
                        checked={stateForAllCheckboxes}
                        onChangeChecked={setChecked}
                    >
                        some text
                    </SuperCheckbox>
                </div>
                {/* Совместим со старым кодом: */}
                <div>
                    <SuperCheckbox
                        id={'hw4-super-checkbox-like-old'}
                        checked={stateForAllCheckboxes}
                        onChange={(e) => setChecked(e.currentTarget.checked)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Stand;
