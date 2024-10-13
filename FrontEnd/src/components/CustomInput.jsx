import React from 'react';
import {
    FormField,
    FormControl,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthFormSchema } from '@/lib/utils';

const formSchema = AuthFormSchema('sign-up');

// interface PropsInput {
//     control: import('react-hook-form').Control<z.infer<typeof formSchema>
// }

const CustomInput = ({ control, name, label, placeholder }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='form-item'>
                    <FormLabel className="form-label">
                        {label}
                    </FormLabel>
                    <div className="flex flex-col w-full">
                        <FormControl>
                            <Input
                                id={name}
                                placeholder={placeholder}
                                className="input-class"
                                type={name === 'password' ? 'password' : 'text'}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className="form-message mt-2" />
                    </div>
                </div>
            )}
        />
    );
};

export default CustomInput;
