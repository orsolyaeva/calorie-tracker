import { FC } from 'react'

type FormInputProps = {
    label: string
    labelFor: string
    inputProps: any
    type?: 'text' | 'number'
}

type FormSelectProps = {
    label: string
    labelFor: string
    selectProps: any
    options: { value: number | string; label: string }[]
}

export const FormInput: FC<FormInputProps> = ({ label, labelFor, inputProps, type = 'text' }) => (
    <div className="flex flex-col gap-1">
        <label className="font-medium text-slate-600" htmlFor={labelFor}>
            {label}
        </label>
        <input
            {...inputProps}
            type={type}
            className="bg-slate-100 py-2 px-3 rounded-lg focus:outline-blue-500 focus:bg-white
                        transition-all hover:bg-slate-200 outline outline-slate-300 outline-2"
        />
    </div>
)

export const FormSelect: FC<FormSelectProps> = ({ label, labelFor, selectProps, options }) => (
    <div className="flex flex-col gap-1">
        <label className="font-medium text-slate-600" htmlFor={labelFor}>
            {label}
        </label>
        <select
            {...selectProps}
            className="bg-slate-100 py-2 px-3 rounded-lg focus:outline-blue-500 focus:bg-white
                        transition-all hover:bg-slate-200 outline outline-slate-300 outline-2"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
)
