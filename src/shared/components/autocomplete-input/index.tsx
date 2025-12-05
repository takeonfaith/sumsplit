import { IconX } from '@tabler/icons-react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Button } from '../button';
import { Input } from '../input';
import type { InputView } from '../input/types';
import { SuggestionIcon } from './SuggestionIcon';
import { useAutocomplete } from './useAutocomplete';
import type { Suggestion } from './useSuggestionsFilter';

const AutocompleteWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const SuggestionsList = styled.ul<{
    visible: boolean;
    position: { top: number; left: number; width: number };
}>`
    position: fixed;
    top: ${(props) => props.position.top}px;
    left: ${(props) => props.position.left}px;
    width: ${(props) => props.position.width}px;
    margin-top: 4px;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    max-height: 210px;
    overflow-y: auto;
    z-index: 1000;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    padding: 4px;
    list-style: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SuggestionItem = styled.li<{ isActive: boolean }>`
    padding: 10px;
    cursor: pointer;
    background: ${(props) => (props.isActive ? '#f0f0f0' : 'transparent')};
    font-weight: 300;
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 4px;

    &:hover {
        background: #f0f0f0;
    }
`;

type Props = {
    value: string;
    onChange: (value: string) => void;
    onSelect?: (value: string) => void;
    placeholder?: string;
    className?: string;
    autoFocus?: boolean;
    id?: string;
    icon?: React.ReactNode;
    view?: InputView;
    suggestions: Suggestion[];
    getValue?: (item: Suggestion) => string;
};

export const AutocompleteInput = ({
    value,
    onChange,
    onSelect,
    placeholder,
    className,
    autoFocus,
    id,
    icon,
    view,
    suggestions,
    getValue,
}: Props) => {
    const {
        selectedIndex,
        position,
        wrapperRef,
        inputRef,
        suggestionsListRef,
        filteredSuggestions,
        showSuggestions,
        handleInputChange,
        handleKeyDown,
        handleSelect,
        setSelectedIndex,
        getValue: getValueFromHook,
    } = useAutocomplete(value, onChange, onSelect, {
        suggestions,
        getValue,
    });

    const finalGetValue = getValue || getValueFromHook;

    return (
        <AutocompleteWrapper ref={wrapperRef}>
            <Input
                ref={inputRef}
                value={value}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={className}
                autoFocus={autoFocus}
                id={id}
                autoComplete="off"
                iconLeft={icon}
                view={view}
                iconRight={
                    value.length > 0 && (
                        <Button
                            onClick={() => onChange('')}
                            className="clear rounded square size-s "
                        >
                            <IconX />
                        </Button>
                    )
                }
            />
            {ReactDOM.createPortal(
                <SuggestionsList
                    ref={suggestionsListRef}
                    visible={showSuggestions}
                    position={position}
                >
                    {filteredSuggestions.map((suggestion, index) => {
                        const value = finalGetValue(suggestion);
                        return (
                            <SuggestionItem
                                key={suggestion.displayValue + index}
                                isActive={index === selectedIndex}
                                onClick={() => handleSelect(value)}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                <SuggestionIcon icon={suggestion.icon} />
                                {suggestion.displayValue}
                            </SuggestionItem>
                        );
                    })}
                </SuggestionsList>,
                document.body
            )}
        </AutocompleteWrapper>
    );
};
