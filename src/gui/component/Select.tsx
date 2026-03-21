import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { contains } from '@/util/dom';
interface SelectProps {
    initialValue: any;
    disabled?: boolean;
    tooltip?: string;
    className?: string;
    onSelect?: (value: any) => void;
    labelStyle?: (value: any) => React.CSSProperties;
    children?: React.ReactNode;
}
type SelectOptionProps = {
    value: any;
    label?: React.ReactNode;
    disabled?: boolean;
    selected?: boolean;
    labelStyle?: React.CSSProperties;
    onClick?: () => void;
};
export const Select: React.FC<SelectProps> = ({ initialValue, disabled, tooltip, className, onSelect, labelStyle, children, }) => {
    const [value, setValue] = useState(() => initialValue);
    const [hoverValue, setHoverValue] = useState(() => initialValue);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (value !== initialValue) {
            setValue(initialValue);
            setHoverValue(initialValue);
        }
    }, [initialValue]);
    useEffect(() => {
        if (isOpen) {
            setHoverValue(value);
            const handleClickOutside = (e: MouseEvent) => {
                const target = e.target instanceof Element ? e.target : null;
                if (containerRef.current && !contains(containerRef.current, target)) {
                    setIsOpen(false);
                }
            };
            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [isOpen]);
    const selectedChild = React.Children.toArray(children).find((child): child is React.ReactElement<SelectOptionProps> => React.isValidElement<SelectOptionProps>(child) && child.props.value === value);
    return (<div style={{ display: 'inline-block', verticalAlign: 'middle' }} className={className}>
      <div className={classNames('select', { disabled })} data-r-tooltip={tooltip} ref={containerRef}>
        <div className="select-value" onClick={() => !disabled && setIsOpen(!isOpen)}>
          <div style={labelStyle?.(value)}>
            {selectedChild?.props.label ?? ''}
          </div>
        </div>
        {isOpen && (<div className="select-layer">
            {React.Children.map(children, (child) => {
                if (!React.isValidElement<SelectOptionProps>(child))
                    return null;
                const childValue = child.props.value;
                const isDisabled = child.props.disabled;
                return (<div key={String(childValue)} onMouseEnter={() => !isDisabled && setHoverValue(childValue)}>
                  {React.cloneElement(child, {
                        selected: childValue === hoverValue,
                        labelStyle: labelStyle?.(childValue),
                        onClick: () => {
                            setValue(childValue);
                            setHoverValue(childValue);
                            onSelect?.(childValue);
                            setIsOpen(false);
                        },
                    })}
                </div>);
            })}
          </div>)}
      </div>
    </div>);
};
