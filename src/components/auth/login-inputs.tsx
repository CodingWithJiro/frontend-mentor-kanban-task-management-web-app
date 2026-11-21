import type { FormData, InputData } from '@/types/login-form-type';
import type { ChangeEvent } from 'react';

interface LoginInputsProps {
  inputData: InputData[];
  formData: FormData;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function LoginInputs({
  inputData,
  formData,
  handleChange,
}: LoginInputsProps) {
  return (
    <ul className="mb-8 flex flex-col gap-6">
      {inputData.map(({ name, label, type }) => {
        return (
          <li key={name} className="relative">
            <input
              className={`peer text-body-l outline-medium-gray/25 hover:outline-main-purple focus-visible:outline-main-purple w-full rounded-sm px-4 py-3 font-medium placeholder-transparent outline-2 transition-colors`}
              id={name}
              name={name}
              type={type}
              value={formData[name]}
              placeholder=" "
              onChange={handleChange}
              required
            />

            <label
              className={`text-heading-s text-medium-gray peer-focus:bg-background-form peer-not-placeholder-shown:bg-background-form peer-focus:text-main-purple peer-hover:text-main-purple pointer-events-none absolute top-4 left-4 origin-left font-bold transition-all peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:px-1 peer-focus:-top-2 peer-focus:scale-90 peer-focus:px-1`}
              htmlFor={name}
            >
              {label}
            </label>

            {true && (
              <p
                id={`${name}-error`}
                className="text-red absolute -bottom-4.5 left-0 text-[0.70rem] font-medium"
              >
                Example error message
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
