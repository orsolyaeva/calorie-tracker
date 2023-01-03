import { FC } from 'react'
import { Controller } from 'react-hook-form'

type FormInputProps = {
    label: string
    labelFor: string
    inputProps: any
    type?: 'text' | 'number'
    className?: string
}

type FormSelectProps = {
    label: string
    labelFor: string
    selectProps: any
    options: { value: number | string; label: string }[]
    className?: string
}

type FormAutoCompleteProps = {
    label: string
    labelFor: string
    autocompleteProps: any
    options: { value: number | string; label: string }[]
    className?: string
    control: any
}

type FormCheckboxProps = {
    label: string
    labelFor: string
    checkboxProps: any
    className?: string
}

type FormSelectWithCategoriesProps = {
    label: string
    labelFor: string
    selectProps: any
    options: { category: string; options: { value: number | string; label: string }[] }[]
    className?: string
}

export const FormInput: FC<FormInputProps> = ({ label, labelFor, inputProps, type = 'text', className }) => (
    <div className={`flex flex-col gap-1 ${className}`}>
        <label className="font-medium text-slate-600" htmlFor={labelFor}>
            {label}
        </label>
        <input
            {...inputProps}
            type={type}
            step={type === 'number' ? 0.1 : undefined}
            className="bg-slate-100 py-2 px-3 rounded-lg focus:outline-blue-500 focus:bg-white
                        transition-all hover:bg-slate-200 outline outline-slate-300 outline-2"
        />
    </div>
)

export const FormSelect: FC<FormSelectProps> = ({ label, labelFor, selectProps, options, className }) => (
    <div className={`flex flex-col gap-1 ${className}`}>
        <label className="font-medium text-slate-600" htmlFor={labelFor}>
            {label}
        </label>
        <select
            {...selectProps}
            className="bg-slate-100 py-2 px-3 rounded-lg focus:outline-blue-500 focus:bg-white
                        transition-all hover:bg-slate-200 outline outline-slate-300 outline-2"
        >
            {selectProps.required ? null : <option value="">Select</option>}
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
)

export const FormSelectWithCategories: FC<FormSelectWithCategoriesProps> = ({
    label,
    labelFor,
    selectProps,
    options,
    className,
}) => (
    <div className={`flex flex-col gap-1 ${className}`}>
        <label className="font-medium text-slate-600" htmlFor={labelFor}>
            {label}
        </label>
        <select
            {...selectProps}
            className="bg-slate-100 py-2 px-3 rounded-lg focus:outline-blue-500 focus:bg-white
                        transition-all hover:bg-slate-200 outline outline-slate-300 outline-2"
        >
            {selectProps.required ? null : <option value="">Select</option>}
            {options.map((option) => (
                <optgroup key={option.category} label={option.category}>
                    {option.options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </optgroup>
            ))}
        </select>
    </div>
)

export const FormTextArea: FC<FormInputProps> = ({ label, labelFor, inputProps, className }) => (
    <div className={`flex flex-col gap-1 ${className}`}>
        <label className="font-medium text-slate-600" htmlFor={labelFor}>
            {label}
        </label>
        <textarea
            {...inputProps}
            className="bg-slate-100 py-2 px-3 rounded-lg focus:outline-blue-500 focus:bg-white
                        transition-all hover:bg-slate-200 outline outline-slate-300 outline-2"
        />
    </div>
)

export const FormCheckbox: FC<FormCheckboxProps> = ({ label, labelFor, checkboxProps, className }) => (
    <div className={`flex flex-col gap-1 ${className}`}>
        <label className="font-medium text-slate-600" htmlFor={labelFor}>
            {label}
        </label>
        <input
            {...checkboxProps}
            type="checkbox"
            className="bg-slate-100 py-2 px-3 rounded-lg focus:outline-blue-500 focus:bg-white
                        transition-all hover:bg-slate-200"
        />
    </div>
)

export const FormToggle: FC<FormCheckboxProps> = ({ label, labelFor, checkboxProps, className }) => (
    <div className={`flex w-fit ${className}`}>
        <label className="font-medium text-slate-600 switch flex gap-2 items-center">
            <input
                {...checkboxProps}
                type="checkbox"
                className="bg-slate-100 py-2 px-3 rounded-lg focus:outline-blue-500 focus:bg-white
                        transition-all hover:bg-slate-200"
                name={labelFor}
            />
            <span className="slider round"></span>
            <span className="ml-8 leading-none">{label}</span>
        </label>
    </div>
)

export const FormAutoComplete: FC<FormAutoCompleteProps> = ({
    label,
    labelFor,
    autocompleteProps,
    options,
    className,
    control,
}) => (
    <Controller
        control={control}
        name={labelFor}
        render={({ field: { onChange, onBlur, value, ref } }) => (
            <div className={`flex flex-col gap-1 ${className} relative`}>
                <label className="font-medium text-slate-600" htmlFor={labelFor}>
                    {label}
                </label>
                <input
                    {...autocompleteProps}
                    type="text"
                    list="autocomplete"
                    className="bg-slate-100 py-2 px-3 rounded-lg focus:outline-blue-500 focus:bg-white
                        transition-all hover:bg-slate-200 outline outline-slate-300 outline-2 peer"
                    name={labelFor}
                    id={labelFor}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                />
                <datalist
                    id="autocomplete"
                    className="absolute z-20 option-list max-h-64 min-h-[0px] flex flex-col top-[4.5rem]
                    left-0 max-w-[100%] min-w-[100%] bg-slate-700 p-4 gap-1 rounded-lg scale-0 opacity-0 peer-focus:scale-100 peer-focus:opacity-100
                    transition-all overflow-y-scroll
                    duration-200 origin-top-left"
                >
                    {options
                        .filter((option) => option.label.indexOf(value || '') > -1)
                        .map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                onClick={() => {
                                    onChange(option.value)
                                }}
                            >
                                {option.label}
                            </option>
                        ))}
                </datalist>
            </div>
        )}
    />
)

export const FormImageInput: FC<FormInputProps> = ({ label, labelFor, inputProps, className }) => (
    <div className={`flex flex-col gap-1 ${className}`}>
        <label className="font-medium text-slate-600" htmlFor={labelFor}>
            {label}
        </label>
        <input
            {...inputProps}
            type="file"
            accept="image/gif, image/jpeg, image/png"
            capture="environment"
            className="bg-slate-100 py-2 px-3 rounded-lg focus:outline-blue-500 focus:bg-white
                        transition-all hover:bg-slate-200 outline outline-slate-300 outline-2"
        />
    </div>
)

export const FormDateInput: FC<FormInputProps> = ({ label, labelFor, inputProps, className }) => (
    <div className={`flex flex-col gap-1 ${className}`}>
        <label className="font-medium text-slate-600" htmlFor={labelFor}>
            {label}
        </label>
        <input
            {...inputProps}
            type="date"
            className="bg-slate-100 py-2 px-3 rounded-lg focus:outline-blue-500 focus:bg-white
                        transition-all hover:bg-slate-200 outline outline-slate-300 outline-2"
        />
    </div>
)

export const FormTimeInput: FC<FormInputProps> = ({ label, labelFor, inputProps, className }) => (
    <div className={`flex flex-col gap-1 ${className}`}>
        <label className="font-medium text-slate-600" htmlFor={labelFor}>
            {label}
        </label>
        <input
            {...inputProps}
            type="time"
            className="bg-slate-100 py-2 px-3 rounded-lg focus:outline-blue-500 focus:bg-white
                        transition-all hover:bg-slate-200 outline outline-slate-300 outline-2"
        />
    </div>
)
